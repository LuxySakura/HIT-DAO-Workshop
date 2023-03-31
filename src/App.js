import logo from './logo.svg';
import './App.css';
import {ConnectWallet} from "./component/ConnectWallet";
import {Button, Typography} from "@mui/material";

const { Conflux } = require("js-conflux-sdk");
const conflux = new Conflux({
    url: 'https://test.confluxrpc.com',
    networkId: 1,  // Note: network is required
    logger: console, // for debug
}); // 设置交互的网络

const PRIVATE_KEY = '0xc1a09448e1469ee1dc782bbb6edc128d51a1e3f0610648138c2142bc55eadadc'

const abi = [
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "name_",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "symbol_",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "uri_",
                "type": "string"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "constructor",
        "name": "constructor"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "owner",
                "type": "address",
                "networkId": 1
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "approved",
                "type": "address",
                "networkId": 1
            },
            {
                "indexed": true,
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256"
            }
        ],
        "name": "Approval",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "owner",
                "type": "address",
                "networkId": 1
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "operator",
                "type": "address",
                "networkId": 1
            },
            {
                "indexed": false,
                "internalType": "bool",
                "name": "approved",
                "type": "bool"
            }
        ],
        "name": "ApprovalForAll",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "bytes32",
                "name": "role",
                "type": "bytes32"
            },
            {
                "indexed": true,
                "internalType": "bytes32",
                "name": "previousAdminRole",
                "type": "bytes32"
            },
            {
                "indexed": true,
                "internalType": "bytes32",
                "name": "newAdminRole",
                "type": "bytes32"
            }
        ],
        "name": "RoleAdminChanged",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "bytes32",
                "name": "role",
                "type": "bytes32"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "account",
                "type": "address",
                "networkId": 1
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "sender",
                "type": "address",
                "networkId": 1
            }
        ],
        "name": "RoleGranted",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "bytes32",
                "name": "role",
                "type": "bytes32"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "account",
                "type": "address",
                "networkId": 1
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "sender",
                "type": "address",
                "networkId": 1
            }
        ],
        "name": "RoleRevoked",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "from",
                "type": "address",
                "networkId": 1
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "to",
                "type": "address",
                "networkId": 1
            },
            {
                "indexed": true,
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256"
            }
        ],
        "name": "Transfer",
        "type": "event"
    },
    {
        "inputs": [],
        "name": "DEFAULT_ADMIN_ROLE",
        "outputs": [
            {
                "internalType": "bytes32",
                "name": "",
                "type": "bytes32"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "MINTER_ROLE",
        "outputs": [
            {
                "internalType": "bytes32",
                "name": "",
                "type": "bytes32"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "PAUSER_ROLE",
        "outputs": [
            {
                "internalType": "bytes32",
                "name": "",
                "type": "bytes32"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "to",
                "type": "address",
                "networkId": 1
            },
            {
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256"
            }
        ],
        "name": "approve",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "owner",
                "type": "address",
                "networkId": 1
            }
        ],
        "name": "balanceOf",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256"
            }
        ],
        "name": "getApproved",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address",
                "networkId": 1
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "bytes32",
                "name": "role",
                "type": "bytes32"
            }
        ],
        "name": "getRoleAdmin",
        "outputs": [
            {
                "internalType": "bytes32",
                "name": "",
                "type": "bytes32"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "bytes32",
                "name": "role",
                "type": "bytes32"
            },
            {
                "internalType": "uint256",
                "name": "index",
                "type": "uint256"
            }
        ],
        "name": "getRoleMember",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address",
                "networkId": 1
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "bytes32",
                "name": "role",
                "type": "bytes32"
            }
        ],
        "name": "getRoleMemberCount",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "bytes32",
                "name": "role",
                "type": "bytes32"
            },
            {
                "internalType": "address",
                "name": "account",
                "type": "address",
                "networkId": 1
            }
        ],
        "name": "grantRole",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "bytes32",
                "name": "role",
                "type": "bytes32"
            },
            {
                "internalType": "address",
                "name": "account",
                "type": "address",
                "networkId": 1
            }
        ],
        "name": "hasRole",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "owner",
                "type": "address",
                "networkId": 1
            },
            {
                "internalType": "address",
                "name": "operator",
                "type": "address",
                "networkId": 1
            }
        ],
        "name": "isApprovedForAll",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "name",
        "outputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256"
            }
        ],
        "name": "ownerOf",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address",
                "networkId": 1
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "bytes32",
                "name": "role",
                "type": "bytes32"
            },
            {
                "internalType": "address",
                "name": "account",
                "type": "address",
                "networkId": 1
            }
        ],
        "name": "renounceRole",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "bytes32",
                "name": "role",
                "type": "bytes32"
            },
            {
                "internalType": "address",
                "name": "account",
                "type": "address",
                "networkId": 1
            }
        ],
        "name": "revokeRole",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "from",
                "type": "address",
                "networkId": 1
            },
            {
                "internalType": "address",
                "name": "to",
                "type": "address",
                "networkId": 1
            },
            {
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256"
            }
        ],
        "name": "safeTransferFrom",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "from",
                "type": "address",
                "networkId": 1
            },
            {
                "internalType": "address",
                "name": "to",
                "type": "address",
                "networkId": 1
            },
            {
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256"
            },
            {
                "internalType": "bytes",
                "name": "data",
                "type": "bytes"
            }
        ],
        "name": "safeTransferFrom",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "operator",
                "type": "address",
                "networkId": 1
            },
            {
                "internalType": "bool",
                "name": "approved",
                "type": "bool"
            }
        ],
        "name": "setApprovalForAll",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "symbol",
        "outputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "index",
                "type": "uint256"
            }
        ],
        "name": "tokenByIndex",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "owner",
                "type": "address",
                "networkId": 1
            },
            {
                "internalType": "uint256",
                "name": "index",
                "type": "uint256"
            }
        ],
        "name": "tokenOfOwnerByIndex",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256"
            }
        ],
        "name": "tokenURI",
        "outputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "offset",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "limit",
                "type": "uint256"
            }
        ],
        "name": "tokens",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "total",
                "type": "uint256"
            },
            {
                "internalType": "uint256[]",
                "name": "tokenIds",
                "type": "uint256[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "owner",
                "type": "address",
                "networkId": 1
            },
            {
                "internalType": "uint256",
                "name": "offset",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "limit",
                "type": "uint256"
            }
        ],
        "name": "tokensOf",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "total",
                "type": "uint256"
            },
            {
                "internalType": "uint256[]",
                "name": "tokenIds",
                "type": "uint256[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "totalSupply",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "from",
                "type": "address",
                "networkId": 1
            },
            {
                "internalType": "address",
                "name": "to",
                "type": "address",
                "networkId": 1
            },
            {
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256"
            }
        ],
        "name": "transferFrom",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "minter_",
                "type": "address",
                "networkId": 1
            }
        ],
        "name": "addMinter",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "minter_",
                "type": "address",
                "networkId": 1
            }
        ],
        "name": "removeMinter",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "to",
                "type": "address",
                "networkId": 1
            }
        ],
        "name": "mint",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "to",
                "type": "address",
                "networkId": 1
            },
            {
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            }
        ],
        "name": "mintBatch",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address[]",
                "name": "_initialOwners",
                "type": "address[]"
            }
        ],
        "name": "batchAddItemByAddress",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "bytes4",
                "name": "interfaceId",
                "type": "bytes4"
            }
        ],
        "name": "supportsInterface",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    }
]
const bytecode = "0x60806040523480156200001157600080fd5b50604051620057a5380380620057a58339818101604052810190620000379190620008c9565b828281600290805190602001906200005192919062000764565b5080600390805190602001906200006a92919062000764565b5050506200007d6200046460201b60201c565b620000885762000394565b6000600167ffffffffffffffff811115620000cc577f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b604051908082528060200260200182016040528015620000fb5781602001602082028036833780820191505090505b5090506000816000815181106200013b577f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b602002602001019073ffffffffffffffffffffffffffffffffffffffff16908173ffffffffffffffffffffffffffffffffffffffff168152505073088800000000000000000000000000000000000173ffffffffffffffffffffffffffffffffffffffff166310128d3e826040518263ffffffff1660e01b8152600401620001c4919062000a81565b600060405180830381600087803b158015620001df57600080fd5b505af1158015620001f4573d6000803e3d6000fd5b5050505073088800000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff1663c55b6bb73060006040518363ffffffff1660e01b81526004016200024a92919062000a54565b600060405180830381600087803b1580156200026557600080fd5b505af11580156200027a573d6000803e3d6000fd5b50505050600073ffffffffffffffffffffffffffffffffffffffff1673088800000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff166364efb22b306040518263ffffffff1660e01b8152600401620002e5919062000a37565b60206040518083038186803b158015620002fe57600080fd5b505afa15801562000313573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906200033991906200089d565b73ffffffffffffffffffffffffffffffffffffffff161462000392576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401620003899062000aa5565b60405180910390fd5b505b620003b86000801b620003ac620004ab60201b60201c565b620004b360201b60201c565b620003f97f9f2df0fed2c77648de5860a4cc508cd0818c85b8b8a1ab4ceeef8d981c8956a6620003ed620004ab60201b60201c565b620004b360201b60201c565b6200043a7f65d7a28e3265b37a6474929f336521b332c1681b933f6cb9f3376673440d862a6200042e620004ab60201b60201c565b620004b360201b60201c565b80600d90805190602001906200045292919062000764565b506001600c8190555050505062000cf8565b6000620004a67388887ed889e776bcbe2f0f9932ecfabcdfcd182073ffffffffffffffffffffffffffffffffffffffff16620004c960201b620016191760201c565b905090565b600033905090565b620004c58282620004ec60201b60201c565b5050565b6000808273ffffffffffffffffffffffffffffffffffffffff163b119050919050565b6200050382826200053460201b6200163c1760201c565b6200052f81600160008581526020019081526020016000206200062560201b6200171c1790919060201c565b505050565b6200054682826200065d60201b60201c565b6200062157600160008084815260200190815260200160002060000160008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff021916908315150217905550620005c6620004ab60201b60201c565b73ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff16837f2f8788117e7eff1d82e926ec794901d17c78024a50270940304540a733656f0d60405160405180910390a45b5050565b600062000655836000018373ffffffffffffffffffffffffffffffffffffffff1660001b620006c760201b60201c565b905092915050565b600080600084815260200190815260200160002060000160008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff16905092915050565b6000620006db83836200074160201b60201c565b620007365782600001829080600181540180825580915050600190039060005260206000200160009091909190915055826000018054905083600101600084815260200190815260200160002081905550600190506200073b565b600090505b92915050565b600080836001016000848152602001908152602001600020541415905092915050565b828054620007729062000bda565b90600052602060002090601f016020900481019282620007965760008555620007e2565b82601f10620007b157805160ff1916838001178555620007e2565b82800160010185558215620007e2579182015b82811115620007e1578251825591602001919060010190620007c4565b5b509050620007f19190620007f5565b5090565b5b8082111562000810576000816000905550600101620007f6565b5090565b60006200082b620008258462000af0565b62000ac7565b9050828152602081018484840111156200084457600080fd5b6200085184828562000ba4565b509392505050565b6000815190506200086a8162000cde565b92915050565b600082601f8301126200088257600080fd5b81516200089484826020860162000814565b91505092915050565b600060208284031215620008b057600080fd5b6000620008c08482850162000859565b91505092915050565b600080600060608486031215620008df57600080fd5b600084015167ffffffffffffffff811115620008fa57600080fd5b620009088682870162000870565b935050602084015167ffffffffffffffff8111156200092657600080fd5b620009348682870162000870565b925050604084015167ffffffffffffffff8111156200095257600080fd5b620009608682870162000870565b9150509250925092565b600062000978838362000984565b60208301905092915050565b6200098f8162000b70565b82525050565b620009a08162000b70565b82525050565b6000620009b38262000b36565b620009bf818562000b4e565b9350620009cc8362000b26565b8060005b8381101562000a03578151620009e788826200096a565b9750620009f48362000b41565b925050600181019050620009d0565b5085935050505092915050565b600062000a1f60158362000b5f565b915062000a2c8262000cb5565b602082019050919050565b600060208201905062000a4e600083018462000995565b92915050565b600060408201905062000a6b600083018562000995565b62000a7a602083018462000995565b9392505050565b6000602082019050818103600083015262000a9d8184620009a6565b905092915050565b6000602082019050818103600083015262000ac08162000a10565b9050919050565b600062000ad362000ae6565b905062000ae1828262000c10565b919050565b6000604051905090565b600067ffffffffffffffff82111562000b0e5762000b0d62000c75565b5b62000b198262000ca4565b9050602081019050919050565b6000819050602082019050919050565b600081519050919050565b6000602082019050919050565b600082825260208201905092915050565b600082825260208201905092915050565b600062000b7d8262000b84565b9050919050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b60005b8381101562000bc457808201518184015260208101905062000ba7565b8381111562000bd4576000848401525b50505050565b6000600282049050600182168062000bf357607f821691505b6020821081141562000c0a5762000c0962000c46565b5b50919050565b62000c1b8262000ca4565b810181811067ffffffffffffffff8211171562000c3d5762000c3c62000c75565b5b80604052505050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b6000601f19601f8301169050919050565b7f726571756972652061646d696e203d3d206e756c6c0000000000000000000000600082015250565b62000ce98162000b70565b811462000cf557600080fd5b50565b614a9d8062000d086000396000f3fe608060405234801561001057600080fd5b50600436106101fb5760003560e01c80636352211e1161011a578063a217fddf116100ad578063ca15c8731161007c578063ca15c8731461060a578063d53913931461063a578063d547741f14610658578063e63ab1e914610674578063e985e9c514610692576101fb565b8063a217fddf14610584578063a22cb465146105a2578063b88d4fde146105be578063c87b56dd146105da576101fb565b80639010d07c116100e95780639010d07c146104ea57806391d148541461051a57806395d89b411461054a578063983b2d5614610568576101fb565b80636352211e1461043d5780636a6278421461046d57806370a08231146104895780638b4864d6146104b9576101fb565b8063248b71fc1161019257806336568abe1161016157806336568abe146103b957806342842e0e146103d55780634f6ccce7146103f157806354777f4114610421576101fb565b8063248b71fc146103355780632f2ff15d146103515780632f745c591461036d5780633092afd51461039d576101fb565b806318160ddd116101ce57806318160ddd1461029a57806323185dc9146102b857806323b872dd146102e9578063248a9ca314610305576101fb565b806301ffc9a71461020057806306fdde0314610230578063081812fc1461024e578063095ea7b31461027e575b600080fd5b61021a600480360381019061021591906138fb565b6106c2565b6040516102279190613e74565b60405180910390f35b6102386106e4565b6040516102459190613eaa565b60405180910390f35b6102686004803603810190610263919061394d565b610776565b6040516102759190613e0d565b60405180910390f35b6102986004803603810190610293919061378a565b6107bc565b005b6102a26108d4565b6040516102af91906140ec565b60405180910390f35b6102d260048036038101906102cd91906137c6565b6108e1565b6040516102e0929190614107565b60405180910390f35b61030360048036038101906102fe9190613684565b610aa2565b005b61031f600480360381019061031a919061385a565b610b02565b60405161032c9190613e8f565b60405180910390f35b61034f600480360381019061034a919061378a565b610b21565b005b61036b60048036038101906103669190613883565b610be1565b005b6103876004803603810190610382919061378a565b610c02565b60405161039491906140ec565b60405180910390f35b6103b760048036038101906103b2919061361f565b610ca7565b005b6103d360048036038101906103ce9190613883565b610cd4565b005b6103ef60048036038101906103ea9190613684565b610d57565b005b61040b6004803603810190610406919061394d565b610d77565b60405161041891906140ec565b60405180910390f35b61043b60048036038101906104369190613815565b610e0e565b005b6104576004803603810190610452919061394d565b610f24565b6040516104649190613e0d565b60405180910390f35b6104876004803603810190610482919061361f565b610fab565b005b6104a3600480360381019061049e919061361f565b611043565b6040516104b091906140ec565b60405180910390f35b6104d360048036038101906104ce9190613976565b6110fb565b6040516104e1929190614107565b60405180910390f35b61050460048036038101906104ff91906138bf565b6112b9565b6040516105119190613e0d565b60405180910390f35b610534600480360381019061052f9190613883565b6112e8565b6040516105419190613e74565b60405180910390f35b610552611352565b60405161055f9190613eaa565b60405180910390f35b610582600480360381019061057d919061361f565b6113e4565b005b61058c611411565b6040516105999190613e8f565b60405180910390f35b6105bc60048036038101906105b7919061374e565b611418565b005b6105d860048036038101906105d391906136d3565b61142e565b005b6105f460048036038101906105ef919061394d565b611490565b6040516106019190613eaa565b60405180910390f35b610624600480360381019061061f919061385a565b6114f8565b60405161063191906140ec565b60405180910390f35b61064261151c565b60405161064f9190613e8f565b60405180910390f35b610672600480360381019061066d9190613883565b611540565b005b61067c611561565b6040516106899190613e8f565b60405180910390f35b6106ac60048036038101906106a79190613648565b611585565b6040516106b99190613e74565b60405180910390f35b60006106cd8261174c565b806106dd57506106dc826117c6565b5b9050919050565b6060600280546106f3906143d7565b80601f016020809104026020016040519081016040528092919081815260200182805461071f906143d7565b801561076c5780601f106107415761010080835404028352916020019161076c565b820191906000526020600020905b81548152906001019060200180831161074f57829003601f168201915b5050505050905090565b600061078182611840565b6006600083815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050919050565b60006107c782610f24565b90508073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff161415610838576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161082f9061404c565b60405180910390fd5b8073ffffffffffffffffffffffffffffffffffffffff1661085761188b565b73ffffffffffffffffffffffffffffffffffffffff16148061088657506108858161088061188b565b611585565b5b6108c5576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016108bc9061406c565b60405180910390fd5b6108cf8383611893565b505050565b6000600a80549050905090565b600060606108ee85611043565b915060008214806108ff5750818410155b1561097e5781600067ffffffffffffffff811115610946577f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b6040519080825280602002602001820160405280156109745781602001602082028036833780820191505090505b5091509150610a9a565b600061099e848661098f9190614209565b8461194c90919063ffffffff16565b905084816109ac91906142b9565b67ffffffffffffffff8111156109eb577f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b604051908082528060200260200182016040528015610a195781602001602082028036833780820191505090505b50915060008590505b81811015610a9757610a348782610c02565b838783610a4191906142b9565b81518110610a78577f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b6020026020010181815250508080610a8f9061443a565b915050610a22565b50505b935093915050565b610ab3610aad61188b565b82611965565b610af2576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610ae990613eec565b60405180910390fd5b610afd8383836119fa565b505050565b6000806000838152602001908152602001600020600101549050919050565b610b527f9f2df0fed2c77648de5860a4cc508cd0818c85b8b8a1ab4ceeef8d981c8956a6610b4d61188b565b6112e8565b610b91576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610b8890613fcc565b60405180910390fd5b6000600c54905060005b82811015610bc957610bb8848284610bb39190614209565b611cf4565b80610bc29061443a565b9050610b9b565b508181610bd69190614209565b600c81905550505050565b610bea82610b02565b610bf381611f12565b610bfd8383611f26565b505050565b6000610c0d83611043565b8210610c4e576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610c4590613f0c565b60405180910390fd5b600860008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600083815260200190815260200160002054905092915050565b610cd17f9f2df0fed2c77648de5860a4cc508cd0818c85b8b8a1ab4ceeef8d981c8956a682611540565b50565b610cdc61188b565b73ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff1614610d49576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610d40906140cc565b60405180910390fd5b610d538282611f5a565b5050565b610d728383836040518060200160405280600081525061142e565b505050565b6000610d816108d4565b8210610dc2576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610db99061408c565b60405180910390fd5b600a8281548110610dfc577f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b90600052602060002001549050919050565b610e3f7f9f2df0fed2c77648de5860a4cc508cd0818c85b8b8a1ab4ceeef8d981c8956a6610e3a61188b565b6112e8565b610e7e576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610e7590613fcc565b60405180910390fd5b60008282905090506000600c54905060005b82811015610f0b57610efa858583818110610ed4577f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b9050602002016020810190610ee9919061361f565b8284610ef59190614209565b611cf4565b80610f049061443a565b9050610e90565b508181610f189190614209565b600c8190555050505050565b600080610f3083611f8e565b9050600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff161415610fa2576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610f999061402c565b60405180910390fd5b80915050919050565b610fdc7f9f2df0fed2c77648de5860a4cc508cd0818c85b8b8a1ab4ceeef8d981c8956a6610fd761188b565b6112e8565b61101b576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161101290613fcc565b60405180910390fd5b6000600c54905061102c8282611cf4565b6001816110399190614209565b600c819055505050565b60008073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff1614156110b4576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016110ab90613fec565b60405180910390fd5b600560008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020549050919050565b600060606111076108d4565b915060008214806111185750818410155b156111975781600067ffffffffffffffff81111561115f577f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b60405190808252806020026020018201604052801561118d5781602001602082028036833780820191505090505b50915091506112b2565b60006111b784866111a89190614209565b8461194c90919063ffffffff16565b905084816111c591906142b9565b67ffffffffffffffff811115611204577f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b6040519080825280602002602001820160405280156112325781602001602082028036833780820191505090505b50915060008590505b818110156112af5761124c81610d77565b83878361125991906142b9565b81518110611290577f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b60200260200101818152505080806112a79061443a565b91505061123b565b50505b9250929050565b60006112e08260016000868152602001908152602001600020611fcb90919063ffffffff16565b905092915050565b600080600084815260200190815260200160002060000160008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff16905092915050565b606060038054611361906143d7565b80601f016020809104026020016040519081016040528092919081815260200182805461138d906143d7565b80156113da5780601f106113af576101008083540402835291602001916113da565b820191906000526020600020905b8154815290600101906020018083116113bd57829003601f168201915b5050505050905090565b61140e7f9f2df0fed2c77648de5860a4cc508cd0818c85b8b8a1ab4ceeef8d981c8956a682610be1565b50565b6000801b81565b61142a61142361188b565b8383611fe5565b5050565b61143f61143961188b565b83611965565b61147e576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161147590613eec565b60405180910390fd5b61148a84848484612152565b50505050565b606061149b82611840565b60006114a56121ae565b905060008151116114c557604051806020016040528060008152506114f0565b806114cf846121c5565b6040516020016114e0929190613daf565b6040516020818303038152906040525b915050919050565b6000611515600160008481526020019081526020016000206122e9565b9050919050565b7f9f2df0fed2c77648de5860a4cc508cd0818c85b8b8a1ab4ceeef8d981c8956a681565b61154982610b02565b61155281611f12565b61155c8383611f5a565b505050565b7f65d7a28e3265b37a6474929f336521b332c1681b933f6cb9f3376673440d862a81565b6000600760008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff16905092915050565b6000808273ffffffffffffffffffffffffffffffffffffffff163b119050919050565b61164682826112e8565b61171857600160008084815260200190815260200160002060000160008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff0219169083151502179055506116bd61188b565b73ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff16837f2f8788117e7eff1d82e926ec794901d17c78024a50270940304540a733656f0d60405160405180910390a45b5050565b6000611744836000018373ffffffffffffffffffffffffffffffffffffffff1660001b6122fe565b905092915050565b60007f5a05180f000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff191614806117bf57506117be8261236e565b5b9050919050565b60007f780e9d63000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff191614806118395750611838826123e8565b5b9050919050565b611849816124ca565b611888576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161187f9061402c565b60405180910390fd5b50565b600033905090565b816006600083815260200190815260200160002060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550808273ffffffffffffffffffffffffffffffffffffffff1661190683610f24565b73ffffffffffffffffffffffffffffffffffffffff167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92560405160405180910390a45050565b600081831061195b578161195d565b825b905092915050565b60008061197183610f24565b90508073ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff1614806119b357506119b28185611585565b5b806119f157508373ffffffffffffffffffffffffffffffffffffffff166119d984610776565b73ffffffffffffffffffffffffffffffffffffffff16145b91505092915050565b8273ffffffffffffffffffffffffffffffffffffffff16611a1a82610f24565b73ffffffffffffffffffffffffffffffffffffffff1614611a70576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611a6790613f4c565b60405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff161415611ae0576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611ad790613f8c565b60405180910390fd5b611aed838383600161250b565b8273ffffffffffffffffffffffffffffffffffffffff16611b0d82610f24565b73ffffffffffffffffffffffffffffffffffffffff1614611b63576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611b5a90613f4c565b60405180910390fd5b6006600082815260200190815260200160002060006101000a81549073ffffffffffffffffffffffffffffffffffffffff02191690556001600560008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825403925050819055506001600560008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008282540192505081905550816004600083815260200190815260200160002060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550808273ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef60405160405180910390a4611cef838383600161266b565b505050565b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff161415611d64576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611d5b9061400c565b60405180910390fd5b611d6d816124ca565b15611dad576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611da490613f6c565b60405180910390fd5b611dbb60008383600161250b565b611dc4816124ca565b15611e04576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611dfb90613f6c565b60405180910390fd5b6001600560008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008282540192505081905550816004600083815260200190815260200160002060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550808273ffffffffffffffffffffffffffffffffffffffff16600073ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef60405160405180910390a4611f0e60008383600161266b565b5050565b611f2381611f1e61188b565b612671565b50565b611f30828261163c565b611f55816001600085815260200190815260200160002061171c90919063ffffffff16565b505050565b611f6482826126f6565b611f8981600160008581526020019081526020016000206127d790919063ffffffff16565b505050565b60006004600083815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050919050565b6000611fda8360000183612807565b60001c905092915050565b8173ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff161415612054576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161204b90613fac565b60405180910390fd5b80600760008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff0219169083151502179055508173ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff167f17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c31836040516121459190613e74565b60405180910390a3505050565b61215d8484846119fa565b61216984848484612858565b6121a8576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161219f90613f2c565b60405180910390fd5b50505050565b606060405180602001604052806000815250905090565b6060600060016121d4846129ef565b01905060008167ffffffffffffffff811115612219577f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b6040519080825280601f01601f19166020018201604052801561224b5781602001600182028036833780820191505090505b509050600082602001820190505b6001156122de578080600190039150507f3031323334353637383961626364656600000000000000000000000000000000600a86061a8153600a85816122c8577f4e487b7100000000000000000000000000000000000000000000000000000000600052601260045260246000fd5b04945060008514156122d9576122de565b612259565b819350505050919050565b60006122f782600001612c26565b9050919050565b600061230a8383612c37565b612363578260000182908060018154018082558091505060019003906000526020600020016000909190919091505582600001805490508360010160008481526020019081526020016000208190555060019050612368565b600090505b92915050565b60007f7965db0b000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff191614806123e157506123e082612c5a565b5b9050919050565b60007f80ac58cd000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff191614806124b357507f5b5e139f000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916145b806124c357506124c28261174c565b5b9050919050565b60008073ffffffffffffffffffffffffffffffffffffffff166124ec83611f8e565b73ffffffffffffffffffffffffffffffffffffffff1614159050919050565b61251784848484612cc4565b600181111561255b576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401612552906140ac565b60405180910390fd5b6000829050600073ffffffffffffffffffffffffffffffffffffffff168573ffffffffffffffffffffffffffffffffffffffff1614156125a35761259e81612cca565b6125e2565b8373ffffffffffffffffffffffffffffffffffffffff168573ffffffffffffffffffffffffffffffffffffffff16146125e1576125e08582612d13565b5b5b600073ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff1614156126255761262081612e80565b612664565b8473ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff1614612663576126628482612fc3565b5b5b5050505050565b50505050565b61267b82826112e8565b6126f25761268881613042565b6126968360001c602061306f565b6040516020016126a7929190613dd3565b6040516020818303038152906040526040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016126e99190613eaa565b60405180910390fd5b5050565b61270082826112e8565b156127d357600080600084815260200190815260200160002060000160008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff02191690831515021790555061277861188b565b73ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff16837ff6391f5c32d9c69d2a47ea670b442974b53935d1edc7fd64eb21e047a839171b60405160405180910390a45b5050565b60006127ff836000018373ffffffffffffffffffffffffffffffffffffffff1660001b613369565b905092915050565b6000826000018281548110612845577f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b9060005260206000200154905092915050565b60006128798473ffffffffffffffffffffffffffffffffffffffff16611619565b156129e2578373ffffffffffffffffffffffffffffffffffffffff1663150b7a026128a261188b565b8786866040518563ffffffff1660e01b81526004016128c49493929190613e28565b602060405180830381600087803b1580156128de57600080fd5b505af192505050801561290f57506040513d601f19601f8201168201806040525081019061290c9190613924565b60015b612992573d806000811461293f576040519150601f19603f3d011682016040523d82523d6000602084013e612944565b606091505b5060008151141561298a576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161298190613f2c565b60405180910390fd5b805181602001fd5b63150b7a0260e01b7bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916817bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916149150506129e7565b600190505b949350505050565b600080600090507a184f03e93ff9f4daa797ed6e38ed64bf6a1f0100000000000000008310612a73577a184f03e93ff9f4daa797ed6e38ed64bf6a1f0100000000000000008381612a69577f4e487b7100000000000000000000000000000000000000000000000000000000600052601260045260246000fd5b0492506040810190505b6d04ee2d6d415b85acef81000000008310612ad6576d04ee2d6d415b85acef81000000008381612acc577f4e487b7100000000000000000000000000000000000000000000000000000000600052601260045260246000fd5b0492506020810190505b662386f26fc100008310612b2b57662386f26fc100008381612b21577f4e487b7100000000000000000000000000000000000000000000000000000000600052601260045260246000fd5b0492506010810190505b6305f5e1008310612b7a576305f5e1008381612b70577f4e487b7100000000000000000000000000000000000000000000000000000000600052601260045260246000fd5b0492506008810190505b6127108310612bc5576127108381612bbb577f4e487b7100000000000000000000000000000000000000000000000000000000600052601260045260246000fd5b0492506004810190505b60648310612c0e5760648381612c04577f4e487b7100000000000000000000000000000000000000000000000000000000600052601260045260246000fd5b0492506002810190505b600a8310612c1d576001810190505b80915050919050565b600081600001805490509050919050565b600080836001016000848152602001908152602001600020541415905092915050565b60007f01ffc9a7000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916149050919050565b50505050565b600a80549050600b600083815260200190815260200160002081905550600a81908060018154018082558091505060019003906000526020600020016000909190919091505550565b60006001612d2084611043565b612d2a91906142b9565b9050600060096000848152602001908152602001600020549050818114612e0f576000600860008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600084815260200190815260200160002054905080600860008773ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600084815260200190815260200160002081905550816009600083815260200190815260200160002081905550505b6009600084815260200190815260200160002060009055600860008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008381526020019081526020016000206000905550505050565b60006001600a80549050612e9491906142b9565b90506000600b60008481526020019081526020016000205490506000600a8381548110612eea577f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b9060005260206000200154905080600a8381548110612f32577f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b906000526020600020018190555081600b600083815260200190815260200160002081905550600b600085815260200190815260200160002060009055600a805480612fa7577f4e487b7100000000000000000000000000000000000000000000000000000000600052603160045260246000fd5b6001900381819060005260206000200160009055905550505050565b6000612fce83611043565b905081600860008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600083815260200190815260200160002081905550806009600084815260200190815260200160002081905550505050565b60606130688273ffffffffffffffffffffffffffffffffffffffff16601460ff1661306f565b9050919050565b606060006002836002613082919061425f565b61308c9190614209565b67ffffffffffffffff8111156130cb577f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b6040519080825280601f01601f1916602001820160405280156130fd5781602001600182028036833780820191505090505b5090507f30000000000000000000000000000000000000000000000000000000000000008160008151811061315b577f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b60200101907effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916908160001a9053507f7800000000000000000000000000000000000000000000000000000000000000816001815181106131e5577f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b60200101907effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916908160001a90535060006001846002613225919061425f565b61322f9190614209565b90505b600181111561331b577f3031323334353637383961626364656600000000000000000000000000000000600f861660108110613297577f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b1a60f81b8282815181106132d4577f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b60200101907effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916908160001a905350600485901c945080613314906143ad565b9050613232565b506000841461335f576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161335690613ecc565b60405180910390fd5b8091505092915050565b600080836001016000848152602001908152602001600020549050600081146134e357600060018261339b91906142b9565b90506000600186600001805490506133b391906142b9565b905081811461346e5760008660000182815481106133fa577f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b9060005260206000200154905080876000018481548110613444577f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b90600052602060002001819055508387600101600083815260200190815260200160002081905550505b856000018054806134a8577f4e487b7100000000000000000000000000000000000000000000000000000000600052603160045260246000fd5b6001900381819060005260206000200160009055905585600101600086815260200190815260200160002060009055600193505050506134e9565b60009150505b92915050565b60006135026134fd8461415c565b614137565b90508281526020810184848401111561351a57600080fd5b61352584828561436b565b509392505050565b60008135905061353c816149f4565b92915050565b60008083601f84011261355457600080fd5b8235905067ffffffffffffffff81111561356d57600080fd5b60208301915083602082028301111561358557600080fd5b9250929050565b60008135905061359b81614a0b565b92915050565b6000813590506135b081614a22565b92915050565b6000813590506135c581614a39565b92915050565b6000815190506135da81614a39565b92915050565b600082601f8301126135f157600080fd5b81356136018482602086016134ef565b91505092915050565b60008135905061361981614a50565b92915050565b60006020828403121561363157600080fd5b600061363f8482850161352d565b91505092915050565b6000806040838503121561365b57600080fd5b60006136698582860161352d565b925050602061367a8582860161352d565b9150509250929050565b60008060006060848603121561369957600080fd5b60006136a78682870161352d565b93505060206136b88682870161352d565b92505060406136c98682870161360a565b9150509250925092565b600080600080608085870312156136e957600080fd5b60006136f78782880161352d565b94505060206137088782880161352d565b93505060406137198782880161360a565b925050606085013567ffffffffffffffff81111561373657600080fd5b613742878288016135e0565b91505092959194509250565b6000806040838503121561376157600080fd5b600061376f8582860161352d565b92505060206137808582860161358c565b9150509250929050565b6000806040838503121561379d57600080fd5b60006137ab8582860161352d565b92505060206137bc8582860161360a565b9150509250929050565b6000806000606084860312156137db57600080fd5b60006137e98682870161352d565b93505060206137fa8682870161360a565b925050604061380b8682870161360a565b9150509250925092565b6000806020838503121561382857600080fd5b600083013567ffffffffffffffff81111561384257600080fd5b61384e85828601613542565b92509250509250929050565b60006020828403121561386c57600080fd5b600061387a848285016135a1565b91505092915050565b6000806040838503121561389657600080fd5b60006138a4858286016135a1565b92505060206138b58582860161352d565b9150509250929050565b600080604083850312156138d257600080fd5b60006138e0858286016135a1565b92505060206138f18582860161360a565b9150509250929050565b60006020828403121561390d57600080fd5b600061391b848285016135b6565b91505092915050565b60006020828403121561393657600080fd5b6000613944848285016135cb565b91505092915050565b60006020828403121561395f57600080fd5b600061396d8482850161360a565b91505092915050565b6000806040838503121561398957600080fd5b60006139978582860161360a565b92505060206139a88582860161360a565b9150509250929050565b60006139be8383613d91565b60208301905092915050565b6139d3816142ed565b82525050565b60006139e48261419d565b6139ee81856141cb565b93506139f98361418d565b8060005b83811015613a2a578151613a1188826139b2565b9750613a1c836141be565b9250506001810190506139fd565b5085935050505092915050565b613a40816142ff565b82525050565b613a4f8161430b565b82525050565b6000613a60826141a8565b613a6a81856141dc565b9350613a7a81856020860161437a565b613a8381614510565b840191505092915050565b6000613a99826141b3565b613aa381856141ed565b9350613ab381856020860161437a565b613abc81614510565b840191505092915050565b6000613ad2826141b3565b613adc81856141fe565b9350613aec81856020860161437a565b80840191505092915050565b6000613b056020836141ed565b9150613b1082614521565b602082019050919050565b6000613b28602d836141ed565b9150613b338261454a565b604082019050919050565b6000613b4b602b836141ed565b9150613b5682614599565b604082019050919050565b6000613b6e6032836141ed565b9150613b79826145e8565b604082019050919050565b6000613b916025836141ed565b9150613b9c82614637565b604082019050919050565b6000613bb4601c836141ed565b9150613bbf82614686565b602082019050919050565b6000613bd76024836141ed565b9150613be2826146af565b604082019050919050565b6000613bfa6019836141ed565b9150613c05826146fe565b602082019050919050565b6000613c1d6031836141ed565b9150613c2882614727565b604082019050919050565b6000613c406029836141ed565b9150613c4b82614776565b604082019050919050565b6000613c636020836141ed565b9150613c6e826147c5565b602082019050919050565b6000613c866018836141ed565b9150613c91826147ee565b602082019050919050565b6000613ca96021836141ed565b9150613cb482614817565b604082019050919050565b6000613ccc603d836141ed565b9150613cd782614866565b604082019050919050565b6000613cef602c836141ed565b9150613cfa826148b5565b604082019050919050565b6000613d126017836141fe565b9150613d1d82614904565b601782019050919050565b6000613d356035836141ed565b9150613d408261492d565b604082019050919050565b6000613d586011836141fe565b9150613d638261497c565b601182019050919050565b6000613d7b602f836141ed565b9150613d86826149a5565b604082019050919050565b613d9a81614361565b82525050565b613da981614361565b82525050565b6000613dbb8285613ac7565b9150613dc78284613ac7565b91508190509392505050565b6000613dde82613d05565b9150613dea8285613ac7565b9150613df582613d4b565b9150613e018284613ac7565b91508190509392505050565b6000602082019050613e2260008301846139ca565b92915050565b6000608082019050613e3d60008301876139ca565b613e4a60208301866139ca565b613e576040830185613da0565b8181036060830152613e698184613a55565b905095945050505050565b6000602082019050613e896000830184613a37565b92915050565b6000602082019050613ea46000830184613a46565b92915050565b60006020820190508181036000830152613ec48184613a8e565b905092915050565b60006020820190508181036000830152613ee581613af8565b9050919050565b60006020820190508181036000830152613f0581613b1b565b9050919050565b60006020820190508181036000830152613f2581613b3e565b9050919050565b60006020820190508181036000830152613f4581613b61565b9050919050565b60006020820190508181036000830152613f6581613b84565b9050919050565b60006020820190508181036000830152613f8581613ba7565b9050919050565b60006020820190508181036000830152613fa581613bca565b9050919050565b60006020820190508181036000830152613fc581613bed565b9050919050565b60006020820190508181036000830152613fe581613c10565b9050919050565b6000602082019050818103600083015261400581613c33565b9050919050565b6000602082019050818103600083015261402581613c56565b9050919050565b6000602082019050818103600083015261404581613c79565b9050919050565b6000602082019050818103600083015261406581613c9c565b9050919050565b6000602082019050818103600083015261408581613cbf565b9050919050565b600060208201905081810360008301526140a581613ce2565b9050919050565b600060208201905081810360008301526140c581613d28565b9050919050565b600060208201905081810360008301526140e581613d6e565b9050919050565b60006020820190506141016000830184613da0565b92915050565b600060408201905061411c6000830185613da0565b818103602083015261412e81846139d9565b90509392505050565b6000614141614152565b905061414d8282614409565b919050565b6000604051905090565b600067ffffffffffffffff821115614177576141766144e1565b5b61418082614510565b9050602081019050919050565b6000819050602082019050919050565b600081519050919050565b600081519050919050565b600081519050919050565b6000602082019050919050565b600082825260208201905092915050565b600082825260208201905092915050565b600082825260208201905092915050565b600081905092915050565b600061421482614361565b915061421f83614361565b9250827fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0382111561425457614253614483565b5b828201905092915050565b600061426a82614361565b915061427583614361565b9250817fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff04831182151516156142ae576142ad614483565b5b828202905092915050565b60006142c482614361565b91506142cf83614361565b9250828210156142e2576142e1614483565b5b828203905092915050565b60006142f882614341565b9050919050565b60008115159050919050565b6000819050919050565b60007fffffffff0000000000000000000000000000000000000000000000000000000082169050919050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000819050919050565b82818337600083830152505050565b60005b8381101561439857808201518184015260208101905061437d565b838111156143a7576000848401525b50505050565b60006143b882614361565b915060008214156143cc576143cb614483565b5b600182039050919050565b600060028204905060018216806143ef57607f821691505b60208210811415614403576144026144b2565b5b50919050565b61441282614510565b810181811067ffffffffffffffff82111715614431576144306144e1565b5b80604052505050565b600061444582614361565b91507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff82141561447857614477614483565b5b600182019050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b6000601f19601f8301169050919050565b7f537472696e67733a20686578206c656e67746820696e73756666696369656e74600082015250565b7f4552433732313a2063616c6c6572206973206e6f7420746f6b656e206f776e6560008201527f72206f7220617070726f76656400000000000000000000000000000000000000602082015250565b7f455243373231456e756d657261626c653a206f776e657220696e646578206f7560008201527f74206f6620626f756e6473000000000000000000000000000000000000000000602082015250565b7f4552433732313a207472616e7366657220746f206e6f6e20455243373231526560008201527f63656976657220696d706c656d656e7465720000000000000000000000000000602082015250565b7f4552433732313a207472616e736665722066726f6d20696e636f72726563742060008201527f6f776e6572000000000000000000000000000000000000000000000000000000602082015250565b7f4552433732313a20746f6b656e20616c7265616479206d696e74656400000000600082015250565b7f4552433732313a207472616e7366657220746f20746865207a65726f2061646460008201527f7265737300000000000000000000000000000000000000000000000000000000602082015250565b7f4552433732313a20617070726f766520746f2063616c6c657200000000000000600082015250565b7f4352433732314e61747572654175746f49643a206d7573742068617665206d6960008201527f6e74657220726f6c6520746f206d696e74000000000000000000000000000000602082015250565b7f4552433732313a2061646472657373207a65726f206973206e6f74206120766160008201527f6c6964206f776e65720000000000000000000000000000000000000000000000602082015250565b7f4552433732313a206d696e7420746f20746865207a65726f2061646472657373600082015250565b7f4552433732313a20696e76616c696420746f6b656e2049440000000000000000600082015250565b7f4552433732313a20617070726f76616c20746f2063757272656e74206f776e6560008201527f7200000000000000000000000000000000000000000000000000000000000000602082015250565b7f4552433732313a20617070726f76652063616c6c6572206973206e6f7420746f60008201527f6b656e206f776e6572206f7220617070726f76656420666f7220616c6c000000602082015250565b7f455243373231456e756d657261626c653a20676c6f62616c20696e646578206f60008201527f7574206f6620626f756e64730000000000000000000000000000000000000000602082015250565b7f416363657373436f6e74726f6c3a206163636f756e7420000000000000000000600082015250565b7f455243373231456e756d657261626c653a20636f6e736563757469766520747260008201527f616e7366657273206e6f7420737570706f727465640000000000000000000000602082015250565b7f206973206d697373696e6720726f6c6520000000000000000000000000000000600082015250565b7f416363657373436f6e74726f6c3a2063616e206f6e6c792072656e6f756e636560008201527f20726f6c657320666f722073656c660000000000000000000000000000000000602082015250565b6149fd816142ed565b8114614a0857600080fd5b50565b614a14816142ff565b8114614a1f57600080fd5b50565b614a2b8161430b565b8114614a3657600080fd5b50565b614a4281614315565b8114614a4d57600080fd5b50565b614a5981614361565b8114614a6457600080fd5b5056fea2646970667358221220a14e27939bfa5ab000f2ccf03ee417fd45eb96211906b0b7b555c689f60904b364736f6c63430008010033"

const mint = async () => {
    // 根据私钥添加账户和合约
    const account = conflux.wallet.addPrivateKey(PRIVATE_KEY);
    const contract = conflux.Contract({abi, bytecode});

    // 直接调用mint函数
    const click_to_mint = await contract.mint({to: account});
    console.log(click_to_mint) // 打印log
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
          <Typography variant="h2" gutterBottom>
              欢迎来到HIT DAO Workshop
          </Typography>
          <ConnectWallet/>
          <Button onClick={mint}>Mint</Button>
      </header>
    </div>
  );
}

export default App;
