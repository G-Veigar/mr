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
    img: 'https://static.demr.xyz/assets/mint-card1-h3xLXaGv.png'
  },
  {
    title: 'Node License NFT',
    content: 'DeMR construction requires substantial spatial computation, real-time perception, and interactive rendering, necessitating numerous computing and storage units. To become a DeMR Computing Node, computing suppliers must hold the Node License NFT, which will be limited release in stages on the official website. ',
    tip: 'Holding equity: Token airdrops, Staking, and Compute to Earn',
    img: 'https://static.demr.xyz/assets/mint-card2-QWeMInUt.png'
  },
  {
    title: 'Land NFT',
    content: "DeMR's Land NFT symbolizes Web3 Spatial Internet infrastructure rights and real-world scarce asset, serving as a potential business right for future MR content ecosystem development. ",
    tip: 'Holding equity: Token airdrops, Land equity',
    img: 'https://static.demr.xyz/assets/mint-card3-8GBFkC2X.png'
  },
]

export type NftIndex = 0 | 1 | 2

export const MINT_DISABELD = false;
// 当前处于mint中的nft，从0开始，0,1,2
export const ACTIVE_NFT_INDEX: NftIndex = 0

// 白名单用户
export const whiteList = [
  '2NSJaaktnttTfx6ryw3wvyTtLXxMKYxHVunyEL4XS6Zd',
  "2e7hALixuQoay72itmDU7eYYAHXQbq2yaZ5sr1XqAgYo",
  "GjwcWFQYzemBtpUoN5fMAP2FZviTtMRWCmrppGuTthJS",
  "AT8nPwujHAD14cLojTcB1qdBzA1VXnT6LVGuUd6Y73Cy",
]

export type NftStatus = 'pending' | 'whiteListActive' | 'publicActive' | 'ended'

export const NFT_STATUS: Record<string, NftStatus> = {
  pending: 'pending',
  whiteListActive: 'whiteListActive',
  publicActive: 'publicActive',
  ended: 'ended'
}

export const nftStatusMap: Record<NftIndex, NftStatus> = {
  0: NFT_STATUS.pending,
  1: NFT_STATUS.pending,
  2: NFT_STATUS.pending
}


