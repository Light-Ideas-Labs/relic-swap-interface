import Image from "next/image";
import { Inter } from "next/font/google";
import React, { useEffect, useState } from "react";
import { useAccount } from "wagmi";

import SwapTokensSection from "@/components/swap-tokens/SwapTokenSection";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [userAddress, setUserAddress] = useState("");
  const [isMounted, setIsMounted] = useState(false);
  const [selectedTab, setSelectedTab] = useState("create");
  const { address, isConnected } = useAccount();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isConnected && address) {
      setUserAddress(address);
    }
  }, [address, isConnected]);

  if (!isMounted) {
    return null;
  }

  return (
    <div className="flex flex-col justify-center items-center">
      <SwapTokensSection accounts="0xERC" tokenData="Data" />
    </div>
  );
}
