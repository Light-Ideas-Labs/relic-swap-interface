export const LISK_SEPOLIA_ID = '4202';
export const LISK_MAINNET_ID = '1135';

const commonContracts = {
    factoryAddress: '0xd100Cc820e3a50e1803f87757bbDbfae7c7Ab71C',
    router02Address: '0x54550361D95252f4DC1a1B12a1580aa4D665049A',
};

const addresses = {
    [LISK_SEPOLIA_ID]: {
        pairs: {
            'USDC-WETH': '0x...',
        },
        tokens: {
            USDC: '0x...',
            WETH: '0x...',
        },
        ...commonContracts,
    },
    [LISK_MAINNET_ID]: {
        pairs: {
            'LSK-WETH': '0x...',
            'USDC-WETH': '0x...',
            'USDC-LSK': '0x...',
        },
        tokens: {
            USDC: '0x...',
            WETH: '0x...',
        },
        ...commonContracts,
    },
};

export default addresses;
