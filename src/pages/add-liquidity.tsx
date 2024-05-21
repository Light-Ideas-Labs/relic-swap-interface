import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { CogIcon, ChevronDownIcon, ArrowLeftIcon } from '@heroicons/react/24/solid'; 
import { useReadContract, useWriteContract } from 'wagmi';
import Image from "next/image";
import TokenModal from "../components/modal/TokenListModal";
import { useContractMethods } from '../blockchain/abis/contract'

interface AddLiquidityProps {
  // Add any props if needed
}

const gradientStyle = {
  background: "linear-gradient(99.82deg, rgba(0, 31, 63, 0.16) 7.06%, rgba(184, 115, 51, 0.16) 55.13%, rgba(0, 31, 63, 0.16) 107.33%)"
};

const AddLiquidity: React.FC<AddLiquidityProps> = () => {
  const router = useRouter();

  const { createPairSetup } = useContractMethods();

  console.log(createPairSetup('0x00', '0x00'))


  const [isTokenModalOpen, setIsTokenModalOpen] = useState(false);
  const [selectedTokenA, setSelectedTokenA] = useState<string>('0x00');
  const [selectedTokenB, setSelectedTokenB] = useState<string>('0x00');
  const [currentTokenSelection, setCurrentTokenSelection] = useState<'A' | 'B'>('A');
  
  // Set up the contract write hook
  const { writeContract, error} = useWriteContract() 

  //  const handlePairAddition =  writeContract()
  





  //  onSelectToken={handleTokenSelect} 
  const toggleTokenModal = () => setIsTokenModalOpen(!isTokenModalOpen);

  const handleTokenSelect = (token: string) => {
    if (currentTokenSelection === 'A') {
      setSelectedTokenA(token);
    } else {
      setSelectedTokenB(token);
    }
    setIsTokenModalOpen(false);
  };



  const handleBackToPoolsClick = () => {
    router.push('/pools');
  };

  return (
    <div className="p-6 rounded-lg shadow-md max-w-md mx-auto" style={gradientStyle}>
      <div className="flex justify-between items-center mb-4">
        <button onClick={handleBackToPoolsClick} className="text-gray-400 hover:text-black">
          <ArrowLeftIcon className="h-6 w-6" />
        </button>
        <h2 className="text-lg font-bold">Add liquidity</h2>
        <button className="text-gray-400 hover:text-black">
          <CogIcon className="h-6 w-6" />
        </button>
      </div>
      <div className="bg-pink-100 p-4 rounded-lg mb-6">
        <p className="text-pink-700">
          <span className="font-bold">Tip:</span> When you add liquidity, you will receive pool tokens representing your position. These tokens automatically earn fees proportional to your share of the pool, and can be redeemed at any time.
        </p>
      </div>
      <div className="mb-4 bg-gray-900 text-white rounded-xl p-4">
        <label className="block text-gray-200 text-sm font-bold mb-2">Amount:</label>
        <div className="relative p-2 rounded-md flex items-center bg-transparent">
          <input
            type="number"
            defaultValue="0"
            className="bg-transparent flex-grow text-left mr-2 outline-none w-full"
          />
          <button className="inset-y-0 flex items-center bg-transparent border border-gray-300 text-white rounded-lg px-3 py-2 w-full max-w-xs" style={gradientStyle} onClick={toggleTokenModal}>
            <Image 
              src="/ether.png"
              alt="icon token"
              width={25} 
              height={25}
            />
            <span className="ml-2">ETH</span>
            <ChevronDownIcon className="h-5 w-5 ml-4 text-white" />
          </button>
          <div className="absolute right-0 bottom-0 mb-1 mr-2 text-sm">
            Balance: 0
          </div>
        </div>
      </div>
      <div className="text-center text-2xl font-bold mb-4">+</div>
      <div className="mb-4 bg-gray-900 text-white rounded-xl p-4">
        <label className="block text-gray-200 text-sm font-bold mb-2">Amount:</label>
        <div className="relative p-2 rounded-md flex items-center bg-transparent">
          <input 
            type="number"
            defaultValue="0"
            className="bg-transparent flex-grow text-left mr-2 outline-none w-full"
          />
          <button className="flex items-center bg-transparent border border-gray-300 text-white rounded-lg px-4 py-2 w-full max-w-xs" onClick={toggleTokenModal}>
            <span className="flex-grow text-left">{"Select a token"}</span>
            <ChevronDownIcon className="h-5 w-5 ml-2 text-white" />
          </button>
          <div className="absolute right-0 bottom-0 mb-1 mr-2 text-sm">
            Balance: 0
          </div>
        </div>
      </div>
      <div className="bg-gray-100 p-4 rounded-lg text-center">
        <p className="text-gray-900">Invalid pair</p>
      </div>
      <TokenModal isOpen={isTokenModalOpen} onClose={toggleTokenModal} /> 
    </div>
  );
};

export default AddLiquidity;
