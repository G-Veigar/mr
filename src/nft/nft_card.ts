export type NftCard = {
  "version": "0.1.0",
  "name": "nft_card",
  "constants": [
    {
      "name": "ADMIN_PUBKEY",
      "type": "publicKey",
      "value": "pubkey ! (\"2e7hALixuQoay72itmDU7eYYAHXQbq2yaZ5sr1XqAgYo\")"
    },
    {
      "name": "COLLECTION_URI",
      "type": "string",
      "value": "\"https://bafkreigj27k7ydp7p6n5yrf3tkze2sqhuvd3tnqt4ailrutk4nuvfnl2ze.ipfs.nftstorage.link/\""
    },
    {
      "name": "COLLECTION_SYMBOL",
      "type": "string",
      "value": "\"DCN\""
    },
    {
      "name": "COLLECTION_NAME",
      "type": "string",
      "value": "\"DeMR Network Compass Collection\""
    },
    {
      "name": "TOKEN_NAME",
      "type": "string",
      "value": "\"DeMR Network Compass NFT\""
    },
    {
      "name": "MINT_MAX_SUPPLY",
      "type": "u64",
      "value": "10000"
    },
    {
      "name": "WHITE_LIST_MAX_SUPPLY",
      "type": "u64",
      "value": "5000"
    },
    {
      "name": "ADMIN_MAX_SUPPLY",
      "type": "u64",
      "value": "3400"
    },
    {
      "name": "MINT_PRICE",
      "type": "u64",
      "value": "1_000_000_000"
    }
  ],
  "instructions": [
    {
      "name": "initialize",
      "accounts": [
        {
          "name": "signer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "adminState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "collectionMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "masterEdition",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "metadataAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenMetadataProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "merkleRoot",
          "type": {
            "array": [
              "u8",
              32
            ]
          }
        },
        {
          "name": "whitelistStartTime",
          "type": "u64"
        },
        {
          "name": "whitelistEndTime",
          "type": "u64"
        },
        {
          "name": "startTime",
          "type": "u64"
        },
        {
          "name": "endTime",
          "type": "u64"
        }
      ]
    },
    {
      "name": "adminMint",
      "accounts": [
        {
          "name": "signer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "adminState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "collectionMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "collectionMasterEdition",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "collectionMetadataAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenMint",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "tokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "masterEdition",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "metadataAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenMetadataProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "adminSetMerkleRoot",
      "accounts": [
        {
          "name": "signer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "adminState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "merkleRoot",
          "type": {
            "array": [
              "u8",
              32
            ]
          }
        }
      ]
    },
    {
      "name": "mint",
      "accounts": [
        {
          "name": "signer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "adminState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "mintCounter",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "to",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "collectionMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "collectionMasterEdition",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "collectionMetadataAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenMint",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "tokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "masterEdition",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "metadataAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenMetadataProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "proof",
          "type": {
            "vec": {
              "array": [
                "u8",
                32
              ]
            }
          }
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "adminState",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "admin",
            "type": "publicKey"
          },
          {
            "name": "merkleRoot",
            "type": {
              "array": [
                "u8",
                32
              ]
            }
          },
          {
            "name": "adminMaxSupply",
            "type": "u64"
          },
          {
            "name": "adminMintSupply",
            "type": "u64"
          },
          {
            "name": "whitelistStartTime",
            "type": "u64"
          },
          {
            "name": "whitelistEndTime",
            "type": "u64"
          },
          {
            "name": "whitelistMaxSupply",
            "type": "u64"
          },
          {
            "name": "whitelistMintSupply",
            "type": "u64"
          },
          {
            "name": "startTime",
            "type": "u64"
          },
          {
            "name": "endTime",
            "type": "u64"
          },
          {
            "name": "mintMaxSupply",
            "type": "u64"
          },
          {
            "name": "mintSupply",
            "type": "u64"
          },
          {
            "name": "mintPrice",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "mintCounter",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "count",
            "type": "u64"
          }
        ]
      }
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "NotAdmin",
      "msg": "Not admin"
    },
    {
      "code": 6001,
      "name": "MintIsEnd",
      "msg": "Mint is End"
    },
    {
      "code": 6002,
      "name": "ProofIsNotVerified",
      "msg": "Proof is not verified"
    },
    {
      "code": 6003,
      "name": "ProofIsBad",
      "msg": "Proof is bad"
    },
    {
      "code": 6004,
      "name": "NotVerified",
      "msg": "Account not in whitelist"
    },
    {
      "code": 6005,
      "name": "YourMintSupplyNotEnough",
      "msg": "Your mint supply is not enough"
    },
    {
      "code": 6006,
      "name": "MintSupplyOverflow",
      "msg": "Mint supply overflow"
    },
    {
      "code": 6007,
      "name": "AdminMintSupplyOverflow",
      "msg": "Admin mint supply overflow"
    }
  ]
};

export const IDL: NftCard = {
  "version": "0.1.0",
  "name": "nft_card",
  "constants": [
    {
      "name": "ADMIN_PUBKEY",
      "type": "publicKey",
      "value": "pubkey ! (\"2e7hALixuQoay72itmDU7eYYAHXQbq2yaZ5sr1XqAgYo\")"
    },
    {
      "name": "COLLECTION_URI",
      "type": "string",
      "value": "\"https://bafkreigj27k7ydp7p6n5yrf3tkze2sqhuvd3tnqt4ailrutk4nuvfnl2ze.ipfs.nftstorage.link/\""
    },
    {
      "name": "COLLECTION_SYMBOL",
      "type": "string",
      "value": "\"DCN\""
    },
    {
      "name": "COLLECTION_NAME",
      "type": "string",
      "value": "\"DeMR Network Compass Collection\""
    },
    {
      "name": "TOKEN_NAME",
      "type": "string",
      "value": "\"DeMR Network Compass NFT\""
    },
    {
      "name": "MINT_MAX_SUPPLY",
      "type": "u64",
      "value": "10000"
    },
    {
      "name": "WHITE_LIST_MAX_SUPPLY",
      "type": "u64",
      "value": "5000"
    },
    {
      "name": "ADMIN_MAX_SUPPLY",
      "type": "u64",
      "value": "3400"
    },
    {
      "name": "MINT_PRICE",
      "type": "u64",
      "value": "1_000_000_000"
    }
  ],
  "instructions": [
    {
      "name": "initialize",
      "accounts": [
        {
          "name": "signer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "adminState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "collectionMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "masterEdition",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "metadataAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenMetadataProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "merkleRoot",
          "type": {
            "array": [
              "u8",
              32
            ]
          }
        },
        {
          "name": "whitelistStartTime",
          "type": "u64"
        },
        {
          "name": "whitelistEndTime",
          "type": "u64"
        },
        {
          "name": "startTime",
          "type": "u64"
        },
        {
          "name": "endTime",
          "type": "u64"
        }
      ]
    },
    {
      "name": "adminMint",
      "accounts": [
        {
          "name": "signer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "adminState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "collectionMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "collectionMasterEdition",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "collectionMetadataAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenMint",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "tokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "masterEdition",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "metadataAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenMetadataProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "adminSetMerkleRoot",
      "accounts": [
        {
          "name": "signer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "adminState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "merkleRoot",
          "type": {
            "array": [
              "u8",
              32
            ]
          }
        }
      ]
    },
    {
      "name": "mint",
      "accounts": [
        {
          "name": "signer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "adminState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "mintCounter",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "to",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "collectionMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "collectionMasterEdition",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "collectionMetadataAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenMint",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "tokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "masterEdition",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "metadataAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenMetadataProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "proof",
          "type": {
            "vec": {
              "array": [
                "u8",
                32
              ]
            }
          }
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "adminState",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "admin",
            "type": "publicKey"
          },
          {
            "name": "merkleRoot",
            "type": {
              "array": [
                "u8",
                32
              ]
            }
          },
          {
            "name": "adminMaxSupply",
            "type": "u64"
          },
          {
            "name": "adminMintSupply",
            "type": "u64"
          },
          {
            "name": "whitelistStartTime",
            "type": "u64"
          },
          {
            "name": "whitelistEndTime",
            "type": "u64"
          },
          {
            "name": "whitelistMaxSupply",
            "type": "u64"
          },
          {
            "name": "whitelistMintSupply",
            "type": "u64"
          },
          {
            "name": "startTime",
            "type": "u64"
          },
          {
            "name": "endTime",
            "type": "u64"
          },
          {
            "name": "mintMaxSupply",
            "type": "u64"
          },
          {
            "name": "mintSupply",
            "type": "u64"
          },
          {
            "name": "mintPrice",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "mintCounter",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "count",
            "type": "u64"
          }
        ]
      }
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "NotAdmin",
      "msg": "Not admin"
    },
    {
      "code": 6001,
      "name": "MintIsEnd",
      "msg": "Mint is End"
    },
    {
      "code": 6002,
      "name": "ProofIsNotVerified",
      "msg": "Proof is not verified"
    },
    {
      "code": 6003,
      "name": "ProofIsBad",
      "msg": "Proof is bad"
    },
    {
      "code": 6004,
      "name": "NotVerified",
      "msg": "Account not in whitelist"
    },
    {
      "code": 6005,
      "name": "YourMintSupplyNotEnough",
      "msg": "Your mint supply is not enough"
    },
    {
      "code": 6006,
      "name": "MintSupplyOverflow",
      "msg": "Mint supply overflow"
    },
    {
      "code": 6007,
      "name": "AdminMintSupplyOverflow",
      "msg": "Admin mint supply overflow"
    }
  ]
};
