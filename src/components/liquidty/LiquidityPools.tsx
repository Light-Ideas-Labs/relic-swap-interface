import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { ChevronDownIcon } from '@heroicons/react/24/solid';

import { useReadContract, useWriteContract } from 'wagmi';
import { useContractMethods } from '../../blockchain/abis/contract'


interface Pair {
  id: string;
  token0: string;
  token1: string;
  // any other properties that a pair might have
}


const gradientStyle = {
  background: "linear-gradient(99.82deg, rgba(0, 31, 63, 0.16) 7.06%, rgba(184, 115, 51, 0.16) 55.13%, rgba(0, 31, 63, 0.16) 107.33%)"
};

const LiquidityPools: React.FC = () => {
  const router = useRouter();

  const { getAllPairsSetup } = useContractMethods();

  // Set up the contract read hook
  const allPairsConfig = getAllPairsSetup();
  const { data: pairs, isError, isLoading } = useReadContract(allPairsConfig);
  
  // Log the data, error, and loading state
  console.log('Pairs Data:', pairs);


  const handleCreatePairClick = () => {
    router.push('/add-liquidity');
  };


  return (
    <div className="p-6 rounded-lg shadow-md" style={gradientStyle}>
      <div className="bg-gray-900 p-4 rounded-lg mb-6">
        <h2 className="text-lg font-bold">Liquidity provider rewards</h2>
        <p>
          Liquidity providers earn a 0.3% fee on all trades proportional to their share of the pool. Fees are added to the pool, accrue in real-time, and can be claimed by withdrawing your liquidity.
        </p>
        <a href="#" className="text-blue-600 underline">Read more about providing liquidity</a>
      </div>
      <div className="flex justify-between items-center mb-4">
        <div className="relative inline-block">
          <button className="bg-gray-400 px-4 py-2 rounded-md flex items-center">
            Your liquidity
            <ChevronDownIcon className="h-5 w-5 ml-2" />
          </button>
          <div className="absolute mt-2 bg-white border border-gray-200 rounded-md shadow-lg hidden">
            <a href="#" className="block px-4 py-2 text-gray-800">V2</a>
          </div>
        </div>
        <div className="flex space-x-2">
          <button onClick={handleCreatePairClick} className="bg-gray-400 px-4 py-2 rounded-md">Create a pair</button>
          <button className="bg-yellow-500 text-white px-4 py-2 rounded-md">Import pool</button>
          <button className="bg-yellow-500 text-white px-4 py-2 rounded-md">Add liquidity</button>
        </div>
      </div>
      {/* <div>
      {pairs && pairs.map((pair: Pair, index: number) => (
        <div key={index}>{pair.token0} - {pair.token1}</div> // Example usage
      ))}
      </div> */}
      <div className="bg-gray-300 p-4 rounded-lg">
        <p className="text-white-100 text-center">No liquidity found.</p>
      </div>
    </div>
  );
};

export default LiquidityPools;
