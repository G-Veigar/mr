<script lang="ts" setup>
import { ref, computed, onMounted, watchEffect, type Ref } from "vue";
import { nftList, type NFTData } from "../const"
import { useRoute } from "vue-router"
import tippy from 'tippy.js';
import CommonDialog from '../components/CommonDialog.vue'
import TopMessage from '../components/TopMessage.vue'
import { dateFormat } from '../utils/index'
import { ACTIVE_NFT_INDEX } from '../const'
import statusPendingIcon from "../assets/status-pending.svg"
import statusActiveIcon from "../assets/status-active.svg"
import statusEndedIcon from "../assets/status-ended.svg"
// @ts-ignore
import { useAnchorWallet, WalletModalProvider } from "solana-wallets-vue";
// import { AnchorProvider, Program } from "@project-serum/anchor";
// import {
//   Connection,
//   PublicKey,
//   Keypair,
//   clusterApiUrl,
//   SystemProgram,
// } from "@solana/web3.js";
// import { IDL, type NftCard } from "../nft/nft_card";
// import { getMerkleTree } from "../utils/white-list"
// import { useNFT } from '../nft/index'

// const { userMint }= useNFT()

// const programID = new PublicKey(IDL.metadata.address);
// const preflightCommitment = "processed";

const route = useRoute()
const wallet = useAnchorWallet();

// const merkleTree = getMerkleTree()

// const merkleTreeRoot = merkleTree.getRoot()

// console.log('merkleTree\n', merkleTreeRoot);

// const connection = new Connection(
//   clusterApiUrl("devnet"),
//   preflightCommitment
// );

// const provider = computed(() => {
//   if (!wallet.value) return;
//   return new AnchorProvider(connection, wallet.value, {
//     preflightCommitment,
//   });
// });
// const program = computed(() => {
//   if (!provider.value) return;
//   // @ts-ignore
//   return new Program(idl, programID, provider.value);
// });

const nftData: Ref<NFTData> = computed(() => {
  const queryType = route.query?.type || ACTIVE_NFT_INDEX
  const data = nftList[+queryType]
  return data
})

// async function connect() {
//   try {
//     // @ts-ignore
//     const provider = window.okxwallet.solana;
//     const resp = await provider.connect();
//     console.log(resp.publicKey.toString());
//     // 26qv4GCcx98RihuK3c4T6ozB3J7L6VwCuFVc7Ta2A3Uo
//     // { address: string, publicKey: string }
//   } catch (error) {
//     console.log(error);
//     // { code: 4001, message: "User rejected the request."}
//   }
// }

type NftStatus = 0 | 1 | 2 | 3

const NFT_STATUS: Record<string, NftStatus> = {
  pending: 0,
  whiteListActive: 1,
  publicActive: 2,
  ended: 3
}

// TODO: status获取
const nftStatus: Ref<NftStatus> = ref(0)

const nftStatusIcon = computed(() => {
  let icon = ''
  switch (nftStatus.value) {
    case NFT_STATUS.pending: icon = statusPendingIcon; break
    case NFT_STATUS.whiteListActive: icon = statusActiveIcon; break
    case NFT_STATUS.publicActive: icon = statusActiveIcon; break
    case NFT_STATUS.ended: icon = statusEndedIcon; break
  }
  return icon
})
const nftStatusText = computed(() => {
  let status = ''
  switch (nftStatus.value) {
    case NFT_STATUS.pending: status = 'Pending'; break
    case NFT_STATUS.whiteListActive: status = 'WhiteList Mint Active'; break
    case NFT_STATUS.publicActive: status = 'Public Mint Acitve'; break
    case NFT_STATUS.ended: status = 'Ended'; break
  }
  return status
})

// TODO: 活动开始时间
const whitelistStartTime = ref(new Date())
const publicStartTime = ref(new Date())

const startTimeTipArr = computed(() => {
  const tipArr = []
  if (nftStatus.value === NFT_STATUS.pending) {
    tipArr.push(
      `Whitelist Mint Start ${dateFormat(whitelistStartTime.value)}`,
      `Public Mint Start at ${dateFormat(publicStartTime.value)}`
    )
  } else if (nftStatus.value === NFT_STATUS.whiteListActive) {
    tipArr.push(
      `Public Mint Start at ${dateFormat(publicStartTime.value)}`,
    )
  }
  return tipArr
})

// TODO: 进度获取
const mintProgress = ref(0)
// TODO: mint费用 sol
const mintPrice = ref(2)
// TODO: 最大mint上限
const maxMintCount = ref(2)
// TODO: 已mint的数量
const mintedCount = ref(0)
const maxMintTip = computed(() => {
  if (mintedCount.value >= maxMintCount.value) {
    return {
      error: true,
      content: `You've minted ${maxMintCount.value} NFT`
    }
  } else {
    return {
      error: false,
      content: `Max ${maxMintCount.value} mints per wallet`
    }
  }
})

const progressStyle = computed(() => {
  return {
    width: `${mintProgress.value}%`
  }
})

// const modalOpen = ref<boolean>(false);

function handleMint(open: Function) {
  if (wallet.value) {
    // TODO: mint
    // showMessage({
    //   title: 'Minting Success',
    //   content: 'View on Solona FM',
    //   type: 'error'
    // })
    // modalOpen.value = true;
    console.log('Coming soon~!')
  } else {
    open()
  }
}

const nftDetailShow = ref(true);
function toggleOpen() {
  nftDetailShow.value = !nftDetailShow.value
}

const errorMsg = ref('User rejected the request')
const errorDialogShow = ref(false)

type MsgType = 'error' | 'success'

const messageShow = ref(false);
const messageType: Ref<MsgType> = ref('success')
const messageTitle = ref('')
const messageContent = ref('')

function showMessage(options: {
  type: MsgType,
  title: string,
  content: string
}) {
  const { type, title, content } = options
  messageShow.value = true
  messageType.value = type
  messageTitle.value = title
  messageContent.value = content
  setTimeout(() => {
    messageShow.value = false
  }, 5000)
}

let tippyIns: any

watchEffect(() => {
  console.log('wallet.value', wallet.value, tippyIns)
  const ins = tippyIns?.[0]
  if(wallet.value) {
    ins?.enable()
  } else {
    // tippyIns?.hide();
    ins?.disable()
  }
})


onMounted(() => {
  tippyIns = tippy('#mint-page-mint-btn', {
    content: 'Coming soon!',
    trigger: 'click',
    theme: 'light',
  });
  if(!wallet.value) {
    tippyIns?.[0]?.disable()
  }
})
</script>

<template>
  <div class="mint-page">
    <div class="page-main">
      <div class="page-bg"></div>
      <div class="nft-info">
        <img class="nft-img" :src="nftData.img" />
        <div class="nft-name h5 padding" :class="{ opened: nftDetailShow }" @click="toggleOpen">{{ nftData.title }}</div>
        <div class="nft-name pc">{{ nftData.title }}</div>
        <div class="nft-content padding" v-show="nftDetailShow">{{ nftData.content }}</div>
        <div class="nft-tip padding" v-show="nftDetailShow">{{ nftData.tip }}</div>
      </div>
      <div class="mint-box">
        <div class="top-info">
          <div class="nft-status"><img class="status-icon" :src="nftStatusIcon" />{{ nftStatusText }}</div>
          <div class="mint-progress-number">
            {{ mintProgress }}% Minted
          </div>
        </div>
        <div class="mint-progress">
          <div class="inner-bar" :style="progressStyle"></div>
        </div>
        <div class="start-time-tip">
          <div class="tip-title">
            Mint Schedule
          </div>
          <!-- <div class="time-wrapper" v-for="tip in startTimeTipArr" :key="tip">
            <div class="start-icon">Start</div>{{ tip }}
          </div> -->
          <div class="time-wrapper">
            <div class="start-icon">Coming soon</div>
            <span>Whitelist Mint Start: 31 Dec 2023 11:00:00 UTC</span>
          </div>
          <div class="time-wrapper">
            <div class="start-icon">Coming soon</div>
            <span>Public Mint Start: 31 Dec 2023 13:00:00 UTC</span>
          </div>
        </div>
        <div class="mint-price"><img class="sol-logo" src="../assets/solana-sol-logo.png" />{{ mintPrice }} Sol</div>
        <wallet-modal-provider :dark="true">
          <template #default="modalScope">
            <slot v-bind="{ ...modalScope }">
              <button id="mint-page-mint-btn" class="mint-btn" :class="{disabled: wallet}" @click="handleMint(modalScope.openModal)">Mint</button>
            </slot>
          </template>
        </wallet-modal-provider>
        <div class="mint-limit-tip" :class="{ error: maxMintTip.error }">
          {{ maxMintTip.content }}
        </div>
      </div>
    </div>
    <common-dialog type="error" :content="errorMsg" v-model:show="errorDialogShow" :loading="true"></common-dialog>
    <top-message :title="messageTitle" :show="messageShow" :content="messageContent" :type="messageType"></top-message>
  </div>
</template>

<style scoped>
.mint-page {
  background-color: #000;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  padding-bottom: 80px;

  .page-main {
    padding-top: 68px;
    background-color: rgba(0, 0, 0, 0.5);
    color: #fff;
    display: flex;
    flex-direction: column;
    position: relative;
  }

  .padding {
    padding: 0 24px;
  }

  .nft-name {
    font-size: 24px;
    font-weight: 900;
    letter-spacing: 0.72px;

    &.h5 {
      display: flex;
      align-items: center;

      &::after {
        display: block;
        content: '';
        background: url('../assets/arrow-open.svg') 100%/100%;
        width: 28px;
        height: 28px;
        position: relative;
        margin-left: 1px;
        transition: transform 0.2s;
      }

      &.opened {
        &::after {
          transform: rotate(90deg);
        }
      }
    }

    &.pc {
      display: none;
    }
  }

  .nft-content {
    color: #888;
    font-size: 16px;
    font-weight: 500;
    line-height: 28px;
    /* 175% */
    margin-top: 12px;
  }

  .nft-tip {
    color: #D7D7D7;
    font-size: 16px;
    font-weight: 500;
    line-height: 28px;
    /* 175% */
    margin-top: 16px;
  }

  .page-bg {
    display: none;
  }

  .nft-info {
    z-index: 1;
  }

  .top-info {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .mint-box {
    border-radius: 16px;
    width: auto;
    margin: 0 16px;
    padding: 48px 24px;
    z-index: 1;
    color: #fff;
    border: 1PX solid rgba(255, 255, 255, 0.16);
    background: #000;
    margin-top: 32px;
  }

  .nft-status {
    font-size: 20px;
    font-weight: 700;
    display: flex;
    align-items: center;
  }

  .status-icon {
    width: 24px;
    height: 24px;
    margin-right: 8px;
  }

  .mint-progress {
    width: 100%;
    height: 12px;
    background-color: #aaa;
    border-radius: 60px;
    background: rgba(255, 255, 255, 0.12);
    overflow: hidden;
    margin-top: 16PX;
  }

  .inner-bar {
    height: 100%;
    width: 0;
    border-radius: 60px;
    transition: width 0.5s;
    background: linear-gradient(122deg, #9013FE 10.13%, #6610F2 97.38%), rgba(255, 255, 255, 0.06);
  }

  .mint-progress-number {
    display: flex;
    justify-content: flex-end;
    font-weight: 400;
    font-size: 16px;
  }

  .mint-btn {
    color: #fff;
    width: 100%;
    font-size: 16px;
    background: linear-gradient(122deg, #9013FE 10.13%, #6610F2 97.38%);
    border-radius: 12px;
    border: 1px solid rgba(255, 255, 255, 0.32);
    height: 56px;
    line-height: 56px;
    margin-top: 12px;
    &.disabled {
      background: #000;
    }
  }

  .mint-price {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 20px;
    margin-top: 48px;
  }

  .sol-logo {
    width: 22px;
    height: 22px;
    margin-right: 12px;
  }

  .start-time-tip {
    margin-top: 18px;
    text-align: center;

    .tip-title {
      font-weight: 400;
      text-align: left;
      font-size: 16px;
    }

    .time-wrapper {
      color: #B66DFF;
      background: rgba(219, 182, 255, 0.12);
      display: flex;
      align-items: center;
      padding: 16px 24px;
      border-radius: 12px;
      font-size: 14px;
      margin-top: 16px;
      text-align: left;
    }

    .start-icon {
      background: rgba(182, 109, 255, 0.32);
      border-radius: 99px;
      font-weight: 400;
      padding: 4px 12px;
      margin-right: 12px;
      text-align: center;
      flex: none;
    }
  }

  .mint-limit-tip {
    margin-top: 16px;
    font-size: 16px;
    text-align: center;
    color: #D7D7D7;

    &.error {
      color: #f33;
      opacity: initial;
    }
  }
}

@media (min-width: 1024px) {
  .mint-page {
    padding-bottom: 0;

    .page-main {
      padding-top: 0;
      flex: auto;
      max-width: 1100PX;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
    }

    .padding {
      padding: 0;
    }

    .page-bg {
      display: block;
      width: 860PX;
      height: 860PX;
      position: absolute;
      z-index: 0;
      right: 0;
      top: 50%;
      transform: translateY(-50%);
      background: url('../assets/mint-bg.jpg') 100% / 100% no-repeat;
      opacity: 0.5;
    }


    .nft-name {
      font-size: 24PX;
      font-weight: 900;
      padding-left: 0px;

      &.pc {
        display: block;
      }

      &.h5 {
        display: none;
      }
    }

    .nft-img {
      max-width: 480PX;
      max-height: 50vh;
      min-height: 380PX;
    }

    .nft-content {
      width: 500PX;
      color: #888;
      font-size: 16PX;
      margin-top: 16PX;
      line-height: 28PX;
    }

    .nft-tip {
      color: #D7D7D7;
      font-size: 16PX;
      margin-top: 20PX;
      line-height: 28PX;
    }

    .mint-box {
      width: 486PX;
      padding: 48PX 24PX;
      border-radius: 16PX;
      margin-top: 0;
    }

    .nft-status {
      font-size: 20PX;
      font-weight: 700;
      display: flex;
      align-items: center;
    }

    .status-icon {
      width: 24PX;
      height: 24PX;
      margin-right: 8PX;
    }

    .mint-progress {
      height: 12PX;
      margin-top: 16PX;
    }

    .mint-progress-number {
      font-size: 16PX;
    }

    .mint-price {
      font-size: 20PX;
      margin-top: 60PX;
    }

    .sol-logo {
      width: 22PX;
      height: 22PX;
      margin-right: 12PX;
    }

    .mint-btn {
      color: #fff;
      width: 100%;
      /* background: linear-gradient(122deg, #9013FE 10.13%, #6610F2 97.38%); */
      border-radius: 12PX;
      height: 56PX;
      line-height: 56PX;
      font-size: 16PX;
      margin-top: 16PX;
    }

    .mint-limit-tip {
      font-size: 16PX;
      color: #fff;
      opacity: 0.5;
      text-align: center;
      margin-top: 16PX;
    }

    .start-time-tip {
      margin-top: 18PX;
      font-size: 12PX;

      .tip-title {
        font-weight: 400;
        font-size: 16PX;
      }

      .time-wrapper {
        margin-top: 16PX;
        border-radius: 12PX;
        font-size: 14PX;
        background: rgba(219, 182, 255, 0.12);
        padding: 16PX 24PX;
      }

      .start-icon {
        margin-right: 12PX;
        padding: 4PX 12PX;
        color: #fff;
      }
    }
  }
}</style>
