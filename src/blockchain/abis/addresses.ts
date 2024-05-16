
export const SEPOLIA_ID = ''
export const MAINNET_ID = ''


const commonContracts = {
    factoryAddress: "",
    router02Address: "" 
}


export {
    [SEPOLIA_ID]: {
        pairs: {
            "USDC-WETH": "0x...",
        },
        tokens: {
            USDC: "0x...",
            WETH: "0x...",
        },
        ...commonContracts
    },

    [MAINNET_ID]: {
        pairs: {
            "LSK-WETH": "0X...",
            "USDC-WETH": "0x...",
            "USDC-LSK": "0x...", 
        },
        tokens: {
            USDC: "0x...",
            WETH: "0x...",
        },
        ...commonContracts
    }
}
