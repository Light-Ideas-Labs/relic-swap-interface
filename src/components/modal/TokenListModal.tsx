import React, { useState, useEffect } from 'react';
import { ChevronDownIcon } from '@heroicons/react/24/solid'; 
import { getAvailableTokens } from '../../blockchain/abis/contract';
import Image from "next/image";

interface TokenListModalProps {
   isOpen: boolean;
   onClose: () => void;
}

interface Token {
    address: string;
    name: string;
}

const TokenListModal: React.FC<TokenListModalProps> = ({ isOpen, onClose }) => {
    const [tokens, setTokens] = useState<Token[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);


    useEffect(() => {
        if (isOpen) {
            const fetchTokens = async () => {
                try {
                    setIsLoading(true);
                    const tokenAddresses = [
                        "0xAddress1",
                        "0xAddress2",
                        // Add more token addresses here
                    ];
                    const availableTokens = await getAvailableTokens(tokenAddresses);
                    setTokens(availableTokens);
                    setIsLoading(false);
                } catch (error) {
                    console.error("Error fetching tokens:", error);
                    setIsError(true);
                    setIsLoading(false);
                }
            };

            fetchTokens();
        }
    }, [isOpen]);


        if (!isOpen) return null;
    
        return (
            <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
                <div className="bg-white rounded-lg p-4 max-w-sm w-full">
                    <div className="flex justify-between items-center">
                        <h2 className="text-lg font-bold">Select a token</h2>
                        <button onClick={onClose} className="text-black">✖</button>
                    </div>
                    <input
                        className="mt-2 p-2 border rounded w-full text-gray-700"
                        placeholder="Search name or paste token address"
                    />
                    <div className="mt-4">
                        <div className="font-bold mb-2 text-gray-700">Available tokens</div>
                        {isLoading ? (
                            <div>Loading...</div>
                        ) : isError ? (
                            <div>Error fetching tokens</div>
                        ) : (
                            tokens.map(token => (
                                <div key={token.address} className="flex items-center p-2 hover:bg-gray-100 cursor-pointer">
                                    <Image src="/ether.png" alt={token.name} width={24} height={24} />
                                    <span className="ml-2 text-gray-700">{token.name}</span>
                                </div>
                            ))
                        )}
                        {/* {['ETH', 'Lisk', 'WEI', 'CELO', 'Ampleforth Governance Token', 'ApeCoin', 'Arbitrum'].map(token => (
                            <div key={token} className="flex items-center p-2 hover:bg-gray-100 cursor-pointer">
                                <Image src="/ether.png" alt={token} width={24} height={24} />
                                <span className="ml-2 text-gray-700">{token}</span>
                            </div>
                        ))} */}
                    </div>
                </div>
            </div>
        );
    };

export default TokenListModal