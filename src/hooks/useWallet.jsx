import { useState, useEffect } from "react";
import api from "../api/axios";
import toast from "react-hot-toast";

function useWallet() {
  const [balance, setBalance] = useState(0);
  const [transactions, setTransactions] = useState([]);

  const [loading, setLoading] = useState(true);
  const [topupLoading, setTopupLoading] = useState(false);
  const [transferLoading, setTransferLoading] = useState(false);

  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [filter, setFilter] = useState("");

  const fetchData = async (pageNumber = 1, type = filter) => {
    try {
      setLoading(true);

      const walletRes = await api.get("/balance");

      const trxRes = await api.get("/transactions", {
        params: {
          page: pageNumber,
          type: type || undefined,
        },
      });

      setBalance(walletRes.data.data.balance ?? 0);

      
      setTransactions(trxRes.data.data.data);
      setPage(trxRes.data.data.current_page);
      setLastPage(trxRes.data.data.last_page);

    } catch (err) {
      toast.error(err.response?.data?.message || "Gagal ambil data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const changePage = (newPage) => {
    fetchData(newPage);
  };

  const changeFilter = (type) => {
    setFilter(type);
    fetchData(1, type);
  };

  const topup = async (amount) => {
    if (!amount || amount <= 0) {
      toast.error("Nominal tidak valid");
      return;
    }

    try {
      setTopupLoading(true);

      const res = await api.post("/topup", { amount });

      toast.success(res.data.message);

      setBalance(res.data.data.new_balance);

      fetchData(page);

    } catch (err) {
      toast.error(err.response?.data?.message || "Topup gagal");
    } finally {
      setTopupLoading(false);
    }
  };

  const transfer = async (email, amount) => {
    if (!email || !amount || amount <= 0) {
      toast.error("Data tidak valid");
      return;
    }

    try {
      setTransferLoading(true);

      const res = await api.post("/transfer", {
        receiver_email: email,
        amount,
      });

      toast.success(res.data.message);

      setBalance(res.data.data.current_balance);

      fetchData(page);

    } catch (err) {
      toast.error(err.response?.data?.message || "Transfer gagal");
    } finally {
      setTransferLoading(false);
    }
  };

  return {
    balance,
    transactions,
    loading,
    page,
    lastPage,
    filter,
    changePage,
    changeFilter,
    topup,
    transfer,
    topupLoading,
    transferLoading,
  };
}

export default useWallet;