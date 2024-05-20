import { ethers } from "ethers";
import { useReadContract, useWriteContract } from 'wagmi'
import { wagmiConfig } from '../config/index';
import { erc20, factory, pair, router } from './abis'


const factoryAddress = '0xd100Cc820e3a50e1803f87757bbDbfae7c7Ab71C'
const router02Address = '0x54550361D95252f4DC1a1B12a1580aa4D665049A' as string;

export const useContractMethods = () => {
  const createPairSetup = (tokenA: string, tokenB: string) => {
    return {
      address: factoryAddress,
      abi: router.abi,
      functionName: 'createPair',
      args: [tokenA, tokenB] as const,
    };
  };

  const getAllPairsSetup = () => {
    return {
      address: factoryAddress,
      abi: router.abi,
      functionName: 'allPairs',
      args: [] as const, // Include args parameter as empty array
    };
  };

  return { createPairSetup, getAllPairsSetup };
};



















interface Token {
    address: string;
    name: string;
}

// Define interfaces for typing
interface TokenInfo {
    address: string;
    name: string;
}

interface PairInfo {
    token0: TokenInfo;
    token1: TokenInfo;
    reserve0: ethers.BigNumber;
    reserve1: ethers.BigNumber;
    totalSupply: ethers.BigNumber;
    token0Price: ethers.BigNumber;
    token1Price: ethers.BigNumber;
    // kLast: ethers.BigNumber;
}

interface FactoryInfo {
    fee: string;
    feeToSetter: string;
    allPairsLength: number;
    allPairs: string[];
}

interface RouterInfo {
    factory: string;
}

// func getPairInfo
// @param pairAddress
// @returns pairsInfo
export const getPairInfo = async (pairAddress: string, tokenAddress: string): Promise<PairInfo[]> => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const { ethereum } = window;

    const pairContract = new ethers.Contract(pairAddress, pair.abi, provider);
    const tokenContract = new ethers.Contract(tokenAddress, erc20.abi, provider);

    const token0Address = await pairContract.methods.token0().call()
    const token1Address = await pairContract.methods.token1().call()

    const token0Name = await tokenContract.methods.name().call()
    const token1Name = await tokenContract.methods.name().call()


    const pairsInfo: PairInfo[] = [{
        token0: {
            address: token0Address,
            name: token0Name,
        },
        token1: {
            address: token1Address,
            name: token1Name,
        },
        reserve0: await pairContract.methods.reserve0().call(),
        reserve1: await pairContract.methods.reserve1().call(),
        totalSupply: await pairContract.methods.totalSupply().call(),
        token0Price: await pairContract.methods.token0Price().call(),
        token1Price: await pairContract.methods.token1Price().call(),
        // kLast: await pairContract.methods.kLast().call(),
    }]

    return pairsInfo;
}

// func getFactoryInfo
// @param factoryAddress
// @returns factoryInfo
export const getFactoryInfo = async (factoryAddress: string): Promise<FactoryInfo> => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const { ethereum } = window;

    const factoryContract = new ethers.Contract(factoryAddress, factory.abi, provider)

    const allPairsLength = await factoryContract.allPairsLength();

    const factoryInfo: FactoryInfo = {
        fee: await factoryContract.methods.feeTo().call(),
        feeToSetter: await factoryContract.methods.feeToSetter().call(),
        allPairsLength: await factoryContract.methods.allPairsLength().call(),
        allPairs: [],
    }

    for (let i = 0; i < allPairsLength; i++) {
        factoryInfo.allPairs.push(await factoryContract.allPairs(i));
    }


    return factoryInfo;
}


// func getRouterInfo
// @params routerAddress
// @returns routerInfo
export const getRouterInfo = async (routerAddress: string): Promise<RouterInfo> => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const { ethereum } = window;

        if (!ethereum) {
                    const signer  = provider.getSigner();
        }

    const routerContract = new ethers.Contract(routerAddress, router.abi, provider);

    const routerInfo = {
        factory: await routerContract.methods.factory().call(),
    }

    return routerInfo;
}


export const getAvailableTokens = async (tokenAddresses: string[]): Promise<Token[]> => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const tokens: Token[] = [];

    for (const address of tokenAddresses) {
        const tokenContract = new ethers.Contract(address, erc20.abi, provider);
        try {
            const name = await tokenContract.name();
            tokens.push({ address, name });
        } catch (error) {
            console.error(`Error fetching token details for address ${address}:`, error);
        }
    }

    return tokens;
};










// export const RELIC_DEX_CONTRACT_ADDRESS = ''
// export const RELIC_TOKEN_CONTRACT_ADDRESS = ''

// export const relicTokenContract = async (address) => {
//     const provider = new ethers.provider.Web3Provider(window.ethereum);
//     const { ethereum } = window;

//     if (!ethereum) {
//         const signer  = provider.getSigner();

//         const contractReader = new ethers.Contract(
//             address,
//             signer
//         )


//         return contractReader;
//     }
// }

// // RelicDexABI
// export const relicDexContract = async () => {
//     const provider = new ethers.providers.Web3Provider(window.ethereum);
//     const { ethereum } = window;

//     if (!ethereum) {
//         const signer = provider.getSigner();

//         const contractReader = new ethers.Contract(
//             RELIC_DEX_CONTRACT_ADDRESS,
//             signer
//         )

//         return contractReader;
//     }
// }





