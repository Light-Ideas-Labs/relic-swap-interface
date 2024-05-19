// import {BigNumber, ethers } from "ethers";
// import { relicDexContract, relicTokenContract } from "./contract";
// import { toETH } from "./utils"

// export async function swapEthToToken(tokenName, amount) {
//     try{
//         let tx = { value: toWei(amount)}

//         const contractObject = await relicDexContract()
//         const data = await contractObject.swapEthToToken(tokenName, tx)

//         const receipt = await data.wait();
//         return receipt;
//     } catch (error) {
//         return parseErrorMsg(error)
//     }
// }

// export async function hasValidAllowance(owner, tokenName, amount) {
//     try {
//         const contractObject = await relicDexContract()
//         const address = await contractObject.getTokenAddress(tokenName)

//         const relicTokenContractObject = await relicTokenContract(address)
//         const data = await relicTokenContractObject.allowance(
//             owner,
//             ""
//         )

//         const result = BigNumber.from(data.toString()).gte(
//             BigNumber.from(toWei(amount))
//         )

//         return result;

//     } catch (error) {
//         return parseErrorMsg(error)
//     }
    
// }

// export async function swapTokenToEth(tokenName, amount) {
//     try {
//         const contractObject = await relicDexContract()
//         const data = await contractObject.swapTokenToEth(tokenName, toWei(amount))

//         const receipt = await data.wait();
//         return receipt;
//     } catch (error) {
//         return parseErrorMsg(error) 
//     }
// }

// export async function swapTokenToToken(srcToken, destToken, amount) {
//     try {
//         const contractObject = await relicDexContract()
//         const data = await contractObject.swapTokenToToken(
//             srcToken, 
//             destToken, 
//             toWei(amount)
//         )

//         const receipt = await data.wait();
//         return receipt;
//     } catch (error) {
//         return parseErrorMsg(error) 
//     }
// }


// export async function getTokenBalance(tokenName, address) {
//     const contractObject = await relicDexContract()
//     const balance = contractObject.getTokenBalance(tokenName, address)

//     return balance
// }


// export async function getTokenAddress(tokenName) {
//     try {
//         const contractObject = await relicDexContract()
//         const balance = contractObject.getTokenAddress(tokenName)
        
//         return balance
//     } catch (error) {
//         return parseErrorMsg(error) 
//     }
// }
