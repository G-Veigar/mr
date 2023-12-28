import viewImg1 from '../assets/mint-card1.png'
import viewImg2 from '../assets/mint-card2.png'
import viewImg3 from '../assets/mint-card3.png'

export type NFTData = {
  title: string,
  content: string,
  tip: string,
  img: string,
}

export const nftList:NFTData[] = [
  {
    title: 'Compass NFT',
    content: 'Compass is the core NFT in DeMR, which is the necessary identification for contributors, who can participate in the construction of DeMR high-precision MR maps and receive DMR token rewards. Compass NFT will be limited release in stages on the official website.',
    tip: 'Holding equity:  Token airdrops, Staking, and Scan to Earn',
    img: viewImg1
  },
  {
    title: 'Node License NFT',
    content: 'DeMR construction requires substantial spatial computation, real-time perception, and interactive rendering, necessitating numerous computing and storage units. To become a DeMR Computing Node, computing suppliers must hold the Node License NFT, which will be limited release in stages on the official website. ',
    tip: 'Holding equity: Token airdrops, Staking, and Compute to Earn',
    img: viewImg2
  },
  {
    title: 'Land NFT',
    content: "DeMR's Land NFT symbolizes Web3 Spatial Internet infrastructure rights and real-world scarce asset, serving as a potential business right for future MR content ecosystem development. ",
    tip: 'Holding equity: Token airdrops, Land equity',
    img: viewImg3
  },
]

export const MINT_DISABELD = false;
// 当前处于mint中的nft，从0开始，0,1,2
export const ACTIVE_NFT_INDEX: 0 | 1 | 2 = 1
