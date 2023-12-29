import { MerkleTree } from 'merkletreejs'
import keccak256 from 'keccak256'
import { whiteList } from '../const'

export function getMerkleTree() {
  // const beginTime = new Date()
  const leafNodes = whiteList.map(addr => keccak256(addr))
  const merkleTree = new MerkleTree(leafNodes, keccak256)
  // 获取根哈希值
  const rootHash = merkleTree.getHexRoot();
  // 需要验证的地址
  // const claimingAddress = leafNodes[0]
  // //取得默克尔树证明
  // const hexProof = merkleTree.getHexProof(claimingAddress)

  return merkleTree
}
