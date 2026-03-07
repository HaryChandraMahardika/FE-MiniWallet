import { useEffect, useState } from "react";
import { useWalletStore } from "../store/useWalletStore";

export default function BalanceCard() {
  const balance = useWalletStore((state) => state.balance);
  const getBalance = useWalletStore((state) => state.getBalance);

  const [animatedBalance, setAnimatedBalance] = useState(0);

  useEffect(() => {
    getBalance();
  }, []);

  useEffect(() => {
    let start = 0;

    const interval = setInterval(() => {
      start += Math.ceil(balance / 20);

      if (start >= balance) {
        start = balance;
        clearInterval(interval);
      }

      setAnimatedBalance(start);
    }, 20);

    return () => clearInterval(interval);
  }, [balance]);

  return (
    <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white p-6 rounded-2xl shadow-lg">
      <p className="text-sm opacity-80">Saldo Wallet</p>

      <h1 className="text-3xl font-bold mt-1">
        Rp {animatedBalance.toLocaleString()}
      </h1>

      <div className="flex gap-3 mt-5">
        <button className="bg-white text-green-600 px-4 py-2 rounded-lg font-semibold hover:opacity-90 cursor-pointer">
          Top Up
        </button>

        <button className="bg-white text-green-600 px-4 py-2 rounded-lg font-semibold hover:opacity-90 cursor-pointer">
          Transfer
        </button>
      </div>
    </div>
  );
}