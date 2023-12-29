import { ref, computed, watchEffect, type Ref } from 'vue'
import { web3, AnchorProvider, setProvider, Program } from '@coral-xyz/anchor'
import { Connection, PublicKey, Keypair, clusterApiUrl, SystemProgram } from '@solana/web3.js'
import type { NftCard } from './nft_card'
import { getAssociatedTokenAddressSync } from '@solana/spl-token'
import * as Buffer from 'buffer'
// import { getMerkleRoot } from "@metaplex-foundation/js";
import { IDL } from '../nft/nft_card'
import { whiteList } from '../const'
import { getMerkleTree } from '@/utils/white-list'
import keccak256 from 'keccak256'
import { ComputedRefSymbol } from '@vue/reactivity'

const TOKEN_METADATA_PROGRAM_ID = new web3.PublicKey('metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s')
const programID = new PublicKey('5vPRVkxkf9DKr4fkHF1cdByTCz57zYxj2hc4rNZcAm2T')
const preflightCommitment = 'processed'

export function useNFT(wallet: Ref<any>) {
  const connection = new Connection(clusterApiUrl('devnet'), preflightCommitment)

  const provider = computed(() => {
    if (!wallet.value) return
    return new AnchorProvider(connection, wallet.value, {
      preflightCommitment
    })
  })

  watchEffect(() => {
    if (provider.value) {
      setProvider(provider.value)
    }
  })

  const program = computed(() => {
    if (!provider.value || !provider.value) return
    return new Program(IDL, programID, provider.value)
  })

  const [AdminStateAccountPDA] = web3.PublicKey.findProgramAddressSync(
    [Buffer.Buffer.from('admin')],
    programID
  )
  const [CollectionMint] = web3.PublicKey.findProgramAddressSync(
    [Buffer.Buffer.from('collection')],
    programID
  )

  const getData = async () => {
    if (!program.value) return
    try {
      const [MintCounterPDA] = PublicKey.findProgramAddressSync(
        // [
        //   Buffer.Buffer.from('2e7hALixuQoay72itmDU7eYYAHXQbq2yaZ5sr1XqAgYo'),
        //   provider.publicKey.toBuffer()
        // ],
        [
          Buffer.Buffer.from('demr'),
          new web3.PublicKey('8eUFLPeD9Hf4bvzAKPknVuVg2efwvgMG12ydBfP87wY5').toBuffer()
        ],
        program.value.programId
      )
      const data = await program.value.account.mintCounter.fetch(MintCounterPDA)

      console.log('getData', BigInt(data.count).toString())
    } catch (e: any) {
      console.log('getData e', e?.message)
      return 0
    }
  }

  const getDataMintState = async () => {
    if (!program.value) return
    try {
      const data = await program.value.account.adminState.fetch(AdminStateAccountPDA)

      return console.log('getDataMintState: mintSupply', BigInt(data.mintSupply).toString())
    } catch (e) {
      return 0
    }
  }

  const mint = async () => {
    if (!provider.value || !program.value) return
    try {
      const mintKey: web3.Keypair = web3.Keypair.generate()
      const [MintCounterPDA] = web3.PublicKey.findProgramAddressSync(
        [Buffer.Buffer.from('demr'), wallet.value?.publicKey.toBuffer()],
        programID
      )

      const [CollectionMetadata] = web3.PublicKey.findProgramAddressSync(
        [
          Buffer.Buffer.from('metadata', 'utf8'),
          TOKEN_METADATA_PROGRAM_ID.toBuffer(),
          CollectionMint.toBuffer()
        ],
        TOKEN_METADATA_PROGRAM_ID
      )

      const [CollectionMaster] = web3.PublicKey.findProgramAddressSync(
        [
          Buffer.Buffer.from('metadata', 'utf8'),
          TOKEN_METADATA_PROGRAM_ID.toBuffer(),
          CollectionMint.toBuffer(),
          Buffer.Buffer.from('edition', 'utf8')
        ],
        TOKEN_METADATA_PROGRAM_ID
      )
      const NftTokenAccount = getAssociatedTokenAddressSync(
        mintKey.publicKey,
        wallet.value?.publicKey
      )

      const [NFTmetadata] = web3.PublicKey.findProgramAddressSync(
        [
          Buffer.Buffer.from('metadata', 'utf8'),
          TOKEN_METADATA_PROGRAM_ID.toBuffer(),
          mintKey.publicKey.toBuffer()
        ],
        TOKEN_METADATA_PROGRAM_ID
      )

      const [NFTMaster] = web3.PublicKey.findProgramAddressSync(
        [
          Buffer.Buffer.from('metadata', 'utf8'),
          TOKEN_METADATA_PROGRAM_ID.toBuffer(),
          mintKey.publicKey.toBuffer(),
          Buffer.Buffer.from('edition', 'utf8')
        ],
        TOKEN_METADATA_PROGRAM_ID
      )

      const proof = getMerkleTree().getProof(keccak256(wallet.value?.publicKey.toBase58()))

      const tx = await program.value.methods
        .mint(proof.map((i) => Array.from(i.data)))
        .accounts({
          signer: wallet.value?.publicKey,
          adminState: AdminStateAccountPDA,
          mintCounter: MintCounterPDA,
          to: new web3.PublicKey('2e7hALixuQoay72itmDU7eYYAHXQbq2yaZ5sr1XqAgYo'),
          tokenMint: mintKey.publicKey,
          tokenAccount: NftTokenAccount,
          metadataAccount: NFTmetadata,
          masterEdition: NFTMaster,
          collectionMint: CollectionMint,
          collectionMetadataAccount: CollectionMetadata,
          collectionMasterEdition: CollectionMaster,
          tokenMetadataProgram: TOKEN_METADATA_PROGRAM_ID
        })
        .signers([mintKey])
        .transaction()
      const txn = new web3.Transaction().add(
        web3.ComputeBudgetProgram.setComputeUnitLimit({
          units: 300_000
        }),
        tx
      )

      const txsign = await provider.value.sendAndConfirm(txn, [mintKey])
      console.log('hash', txsign)
      await provider.value.connection.confirmTransaction(txsign, 'confirmed')
    } catch (e) {
      console.log(e)
    }
  }

  // anchor.setProvider(anchor.AnchorProvider.env());

  // const program = anchor.workspace.NftCard as Program<NftCard>;

  // const providerPublickey = program.value?.provider.publicKey

  // console.log(program.programId.toBase58());

  // console.log("Account Sender:", providerPublickey.toBase58());

  // const minter: anchor.web3.Keypair = anchor.web3.Keypair.generate();

  // whiteList.push(minter.publicKey.toBase58());

  // metaplex token metadata program ID
  // const TOKEN_METADATA_PROGRAM_ID = new web3.PublicKey(
  //   "metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s"
  // );

  // // metaplex setup
  // // const connection = anchor.getProvider().connection;
  // const metaplex = Metaplex.make(connection);

  // if(!program.value) return

  // const [AdminStateAccountPDA] = anchor.web3.PublicKey.findProgramAddressSync(
  //   [Buffer.Buffer.from("admin")],
  //   program.value.programId
  // );

  // const [CollectionMint] = anchor.web3.PublicKey.findProgramAddressSync(
  //   [Buffer.Buffer.from("collection")],
  //   program.value.programId
  // );

  // const userMint = async () => {

  //   const mintKey: anchor.web3.Keypair = anchor.web3.Keypair.generate();

  //   const [MintCounterPDA] = anchor.web3.PublicKey.findProgramAddressSync(
  //     [Buffer.Buffer.from("demr"), providerPublickey.toBuffer()],
  //     program.value.programId
  //   );

  //   const CollectionMetadata = metaplex
  //     .nfts()
  //     .pdas()
  //     .metadata({ mint: CollectionMint });

  //   const CollectionMaster = metaplex
  //     .nfts()
  //     .pdas()
  //     .masterEdition({ mint: CollectionMint });

  //   const NftTokenAccount = getAssociatedTokenAddressSync(
  //     mintKey.publicKey,
  //     providerPublickey
  //   );

  //   const NFTmetadata = metaplex
  //     .nfts()
  //     .pdas()
  //     .metadata({ mint: mintKey.publicKey });

  //   const NFTMaster = metaplex
  //     .nfts()
  //     .pdas()
  //     .masterEdition({ mint: mintKey.publicKey });
  //   const proof = getMerkleProof(whiteList, minter.publicKey.toBase58());

  //     const tx = await program.value.methods
  //       .mint(
  //         proof.map(i => Array.from(i))
  //       )
  //       .accounts({
  //         signer: program.value.provider.publicKey,
  //         adminState:AdminStateAccountPDA,
  //         mintCounter:MintCounterPDA,
  //         to: program.value.provider.publicKey,
  //         tokenMint: mintKey.publicKey,
  //         tokenAccount: NftTokenAccount,
  //         metadataAccount: NFTmetadata,
  //         masterEdition: NFTMaster,
  //         collectionMint: CollectionMint,
  //         collectionMetadataAccount: CollectionMetadata,
  //         collectionMasterEdition: CollectionMaster,
  //         tokenMetadataProgram: TOKEN_METADATA_PROGRAM_ID,
  //       })
  //       .signers([ mintKey])
  //       .transaction();

  //     const txn = new anchor.web3.Transaction().add(
  //       anchor.web3.ComputeBudgetProgram.setComputeUnitLimit({
  //         units: 300_000,
  //       }),
  //       tx
  //     );

  //     // @ts-ignore
  //     const txsign = await program.value.provider.sendAndConfirm(txn, [ mintKey]);
  //     await program.value.provider.connection.confirmTransaction(txsign, "confirmed");

  //     console.log("Your transaction signature", txsign);
  // }

  // 通过返回值暴露所管理的状态
  return {
    // program,
    getData,
    getDataMintState,
    mint
    // whiteList,
    // userMint
  }
}
