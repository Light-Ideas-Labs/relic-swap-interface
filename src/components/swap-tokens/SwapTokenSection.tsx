import React, {useState, useEffect, useContext} from 'react'
import { CogIcon, ChevronDownIcon } from '@heroicons/react/24/solid'; 
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Image from "next/image";
import TokenModal from "../modal/TokenListModal"
import { getPairInfo } from '../../blockchain/abis/contract'
import Token from "../token/Token"


interface SwapSectionProps {
    accounts: any; // Type for accounts data
    tokenData: any; // Type for token data
}

interface Token {
    name: string;
    image: string;
}

const gradientStyle = {
    background: "linear-gradient(99.82deg, rgba(0, 31, 63, 0.16) 7.06%, rgba(184, 115, 51, 0.16) 55.13%, rgba(0, 31, 63, 0.16) 107.33%)"
  };

const SwapTokensSection: React.FC<SwapSectionProps> = ({ accounts, tokenData}) => {
    const [isTokenModalOpen, setIsTokenModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [pairInfo, setPairInfo] = useState<any[]>([]);
    const [data, setData] = useState<any>([]);
    const [openSetting, setOpenSetting] = useState(false);
    const [openTokensTwo, setOpenTokensTwo] = useState(false);
    const [activeTab, setActiveTab] = useState('Swap');

    useEffect(() => {
      const fetchPairInfo = async () => {
        try {
          setIsLoading(true)
          const pairInfo = await getPairInfo("pairAddress", "tokenAddress")
          console.log("pair info", pairInfo)
          setPairInfo(pairInfo)
          setIsLoading(false)
        } catch (error) {
          setIsError(true)
          setIsLoading(false)
        }
      }
      fetchPairInfo();
    }, [])


    const toggleTokenModal = () => setIsTokenModalOpen(!isTokenModalOpen);

    // // token one
    // const [tokenOne, setOpenTokenOne] = useState([
    //     name: "",
    //     image: "",       
    // ])
    
    // // token two
    // const [tokenTwo, setOpenTokenTwo] = useState([
    //     name: "",
    //     image: "",
    // ])

    // tabs
    const handleTabClick = (tabName: string) => {
        setActiveTab(tabName);
    };

    
    return (
<div className="text-white font-sans p-4 rounded-lg" style={gradientStyle}>
      <div className="flex justify-between items-center border-b border-gray-700">
      <div>
          {['Swap', 'Send', 'Buy'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 mr-2 ${activeTab === tab ? 'text-yellow-500 border-b-2 border-yellow-400' : 'text-gray-400 hover:text-white'}`}
            >
              {tab}
            </button>
          ))}
        </div>
        <div className="flex items-center">
          <button className="text-gray-400 hover:text-white mr-2">Clear all</button>
          <CogIcon className="h-5 w-5 text-gray-400 hover:text-white" />
        </div>
      </div>
      {/* here */}
        <div className="mt-6 mb-6 bg-gray-900 text-white rounded-xl p-4">
          <label className="block text-white-700 text-sm font-bold mb-2">You pay:</label>
          <div className="relative p-2 rounded-md">
            <input
               type="number" 
               value="0"
               className="bg-transparent flex-grow text-left mr-2 outline-none w-full rounded"
            />
            

            <button onClick={toggleTokenModal} className="absolute inset-y-0 right-0 flex items-center bg-transparent border border-gray-600 text-white rounded-lg px-3 py-1 mr-2">
                <Image 
                    src="/ether.png"
                    alt="icon token"
                    width={40}
                    height={40}
                />
             ETH
             <ChevronDownIcon className="h-5 w-5 ml-4 text-white" />
          </button>
          <div className="mt-1 text-sm absolute left-0 bottom-[-20px] text-left">
            <span className="text-white">109</span>
          </div>

          <div className="mt-1 text-sm absolute right-0 bottom-[-20px] text-right">
            <span className="text-white">Balance:  1.09</span>
            <span className="text-yellow-500 font-bold"> Max</span>
          </div>

          </div>
        </div>

        <div className="mb-4 bg-gray-900 text-white rounded-xl p-4">
          <label className="block text-white-700 text-sm font-bold mb-2">You receive:</label>
          <div className="flex items-center justify-between p-2 rounded-md">
            <input 
              className="bg-transparent flex-grow text-left mr-2 outline-none"
              type="number" 
              value="0"
            />
            <button onClick={toggleTokenModal} className="flex items-center bg-transparent border border-gray-600 text-white rounded-lg px-3 py-1" style={gradientStyle}>
                Select a token
               <ChevronDownIcon className="h-5 w-5 ml-5 text-white" />
            </button>
          </div>
        </div>

        <TokenModal isOpen={isTokenModalOpen} onClose={toggleTokenModal} />


      <div className="mt-4 flex justify-center">
        <ConnectButton
            showBalance={{
              smallScreen: true,
              largeScreen: true,
            }}
          />
      </div>
    </div>
  )
}

export default SwapTokensSection
