import { create } from "zustand";
import axios from "../api/axios";

export const useWalletStore = create((set) => ({
  balance: 0,
  transactions: [],

  getBalance: async () => {
    const res = await axios.get("/balance");
    set({ balance: res.data.data.balance });
  },

  getTransactions: async () => {
    const res = await axios.get("/transactions");
    set({ transactions: res.data.data.data });
  },
}));