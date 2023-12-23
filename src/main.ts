// import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
// import SolanaWallets from "./wallet/index";
import router from './router'

// import SolanaWallets from "solana-wallets-vue";
// import "solana-wallets-vue/styles.css";

// import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";

// import {
//     PhantomWalletAdapter,
// } from "@solana/wallet-adapter-wallets";

// const walletOptions = {
//     wallets: [
//         new PhantomWalletAdapter({ network: WalletAdapterNetwork.Devnet }),
//     ],
//     autoConnect: true,
// };

const app = createApp(App)

app.use(router)
// app.use(SolanaWallets, walletOptions)

app.mount("#app");
