import { ref, computed, type Ref } from 'vue'
import * as anchor from "@coral-xyz/anchor";
import {
  Connection,
  PublicKey,
  Keypair,
  clusterApiUrl,
  SystemProgram,
} from "@solana/web3.js";
import { Program, web3 } from "@coral-xyz/anchor/dist/esm/index.js";
import type { NftCard } from "./nft_card";
import { Metaplex, getMerkleProof } from "@metaplex-foundation/js";
import { getAssociatedTokenAddressSync } from "@solana/spl-token";
import { publicKey } from "@coral-xyz/anchor/dist/esm/utils";
import * as Buffer from "buffer";
// import { getMerkleRoot } from "@metaplex-foundation/js";
import { IDL } from '../nft/nft_card'
import { whiteList } from '../const'

const metadataAddress = 'metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s'
const programID = new PublicKey(metadataAddress);
const preflightCommitment = "processed";

export function useNFT(wallet: Ref<any>) {
  const connection = new Connection(
    clusterApiUrl("devnet"),
    preflightCommitment
  );

  const provider = new anchor.AnchorProvider(connection, wallet.value, {
    preflightCommitment
  })

  anchor.setProvider(provider);

  const program = new Program(IDL, programID, provider);

  const getData = async () => {
    if(!program || !provider) return;
    const newCounter = Keypair.generate();

    const [ MintCounterPDA ] = PublicKey.findProgramAddressSync(
      [Buffer.Buffer.from("2e7hALixuQoay72itmDU7eYYAHXQbq2yaZ5sr1XqAgYo"), provider.publicKey.toBuffer()],
      // [Buffer.Buffer.from("demr"), '2e7hALixuQoay72itmDU7eYYAHXQbq2yaZ5sr1XqAgYo'],
      program.programId
    );
    const data = await program.account.mintCounter.fetch(
      MintCounterPDA
    )
    console.log(data);
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
    getData
    // whiteList,
    // userMint
  }
}
