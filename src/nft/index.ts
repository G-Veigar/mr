import { ref, computed, watchEffect, type Ref } from 'vue'
import { web3, AnchorProvider, setProvider, Program } from '@coral-xyz/anchor'
import { Connection, PublicKey, Keypair, clusterApiUrl, SystemProgram } from '@solana/web3.js'
import type { NftCard } from './nft_card'
import { getAssociatedTokenAddressSync } from '@solana/spl-token'
import * as Buffer from 'buffer'
import { IDL } from '../nft/nft_card'
import { getMerkleTree } from '@/utils/white-list'
import keccak256 from 'keccak256'

const TOKEN_METADATA_PROGRAM_ID = new web3.PublicKey('metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s')
const programID = new PublicKey('HP3ZFi8eGqfo2NjyoTE1ZntJiWSU8YgKsPhbEU3ZVHoS')
const preflightCommitment = 'processed'

export function useNFT(wallet: Ref<any>) {
  const connection = new Connection(clusterApiUrl('devnet'), preflightCommitment)

  const provider = computed(() => {
    if (!wallet.value) return
    return new AnchorProvider(connection, wallet.value, {
      preflightCommitment
    })
  })

  // const publicProvider = new AnchorProvider(
  //   new web3.Connection(
  //     web3.clusterApiUrl("devnet")
  //   ),
  //   new Wallet(
  //     web3.Keypair.fromSecretKey(fromB58("3einyCxKZrAUc9zS3sHoPiuZt7CtaBspUJMtGJ7h6Qkb3BwMAGpPGu95jVwKDwDRMBq9XBbKb3hrv9bzfmSt5qA9"))
  //   ),
  //   {
  //   }
  // )

  // const publicProgram = new Program(IDL, programID, publicProvider)

  watchEffect(() => {
    if (provider.value) {
      setProvider(provider.value)
    }
  })

  const program = computed(() => {
    if (!provider.value) return;
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
    if (!program.value || !provider.value) return
    try {
      const [MintCounterPDA] = PublicKey.findProgramAddressSync(
        // [
        //   Buffer.Buffer.from('2e7hALixuQoay72itmDU7eYYAHXQbq2yaZ5sr1XqAgYo'),
        //   provider.publicKey.toBuffer()
        // ],
        [
          Buffer.Buffer.from('demr'),
          provider.value.publicKey.toBuffer()
          // new web3.PublicKey('8eUFLPeD9Hf4bvzAKPknVuVg2efwvgMG12ydBfP87wY5').toBuffer()
        ],
        program.value.programId
      )
      const data = await program.value.account.mintCounter.fetch(MintCounterPDA)

      // console.log('getData', BigInt(data.count).toString())
      return +BigInt(data.count).toString()
    } catch (e: any) {
      console.log('getData e', e?.message)
      return 0
    }
  }

  const userMintedCount = ref(0)
  watchEffect(async () => {
    if (!program.value) return
    const count = await getData()
    if(count!==undefined) {
      userMintedCount.value = count
    }
  })

  const getDataMintState = async () => {
    const programIns = program.value
    if (!programIns) return
    try {
      const data = await programIns.account.adminState.fetch(AdminStateAccountPDA)
      const { mintPrice, mintSupply, mintMaxSupply, startTime, whitelistStartTime, whitelistEndTime, endTime } = data

      console.log('getDataMintState', data)

      return {
        mintPrice: +BigInt(mintPrice).toString() / Math.pow(10, 9),
        mintSupply: +BigInt(mintSupply).toString(),
        mintMaxSupply: +BigInt(mintMaxSupply).toString(),
        startTime: +BigInt(startTime).toString(),
        whitelistStartTime: +BigInt(whitelistStartTime).toString(),
        whitelistEndTime: +BigInt(whitelistEndTime).toString(),
        endTime: +BigInt(endTime).toString(),
      }

    } catch (e: any) {
      console.log(e.message)
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
      return txsign
    } catch (e) {
      console.log('mint error', e)
      throw e
    }
  }

  const waitMintResult  = async (txsign: string) => {
    if (!provider.value) return
    await provider.value.connection.confirmTransaction(txsign, 'confirmed')
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
    getData,
    userMintedCount,
    getDataMintState,
    mint,
    waitMintResult
  }
}
