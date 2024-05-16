import React, { useState } from 'react'
import LiquidityPools from '@/components/liquidty/LiquidityPools';

const pools = () => {
  // const [token1, setToken1] = useState<string>('');
  // const [token2, setToken2] = useState<string>('');
  // const [amount1, setAmount1] = useState<string>('');
  // const [amount2, setAmount2] = useState<string>('');
  // const [poolShare, setPoolShare] = useState<string>('0');
  // const [showModal, setShowModal] = useState<boolean>(false);

  // const calculatePoolShare = (amount1: string, amount2: string): string => {
  //   const share = ((parseFloat(amount1) + parseFloat(amount2)) / 1000) * 100;
  //   return share.toFixed(2);
  // };

  // const handleApprove = () => {
  //   console.log('Approving tokens...');
  // };

  // const handleSupply = (event: React.FormEvent<HTMLFormElement>) => {
  //   event.preventDefault();
  //   setShowModal(true);
  // };

  // const handleConfirm = () => {
  //   console.log('Supplying tokens to the liquidity pool...');
  //   setShowModal(false);
  // };

  // const handleCancel = () => {
  //   setShowModal(false);
  // };

  // const handleAmountChange = () => {
  //   const share = calculatePoolShare(amount1, amount2);
  //   setPoolShare(share);
  // };






  return (
    <div className="container mx-auto p-4">
          <LiquidityPools/>
    </div>

  )
}

export default pools
