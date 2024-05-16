import React from 'react'
import SwapTokensSection from "@/components/swap-tokens/SwapTokenSection";

const swap = () => {
  return (
    <div className="container mx-auto p-4">
          <SwapTokensSection accounts={[]} tokenData={[]} />
    </div>

  )
}

export default swap