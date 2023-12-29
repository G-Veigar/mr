// import './assets/main.css'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
// @ts-ignore
import SolanaWallets from "solana-wallets-vue";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { Modal } from 'ant-design-vue';
import {
    PhantomWalletAdapter,
} from "@solana/wallet-adapter-wallets";

import "solana-wallets-vue/styles.css";

const walletOptions = {
    wallets: [
        new PhantomWalletAdapter(),
    ],
    autoConnect: true,
};

const app = createApp(App)

app.use(router)
app.use(SolanaWallets, walletOptions)
app.use(Modal)

app.mount("#app");
