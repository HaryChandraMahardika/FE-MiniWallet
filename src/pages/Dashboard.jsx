import { useEffect, useState } from "react"
import api from "../api/axios"
import Navbar from "../components/Navbar"
import TopupModal from "../components/TopupModal"
import TransferModal from "../components/TransferModal"
import toast from "react-hot-toast"
import { useSearchParams } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"

export default function Dashboard() {

  const [balance, setBalance] = useState(0)
  const [transactions, setTransactions] = useState([])
  const [loading, setLoading] = useState(true)

  const [lastPage, setLastPage] = useState(1)

  const [showTopup, setShowTopup] = useState(false)
  const [showTransfer, setShowTransfer] = useState(false)

  const [searchParams, setSearchParams] = useSearchParams()

  const page = Number(searchParams.get("page")) || 1
  const filter = searchParams.get("type") || "all"

  const loadData = async () => {
    try {
      const balanceRes = await api.get("/balance")
      setBalance(balanceRes.data.data.balance)

      let url = `/transactions?page=${page}`
      if (filter !== "all") {
        url += `&type=${filter}`
      }

      const txRes = await api.get(url)
      setTransactions(txRes.data.data || [])
      setLastPage(txRes.data.pagination.last_page)
    } catch (err) {
      toast.error("Gagal mengambil data")
    }
    setLoading(false)
  }

  useEffect(() => {
    loadData()
  }, [page, filter])


  const changePage = (newPage) => {
    setSearchParams({
      page: newPage,
      type: filter
    })
  }

  const changeFilter = (newFilter) => {
    setSearchParams({
      page: 1,
      type: newFilter
    })
  }

  const monthlyCredit = transactions
    .filter(tx => tx.type === "credit")
    .reduce((acc, tx) => acc + Number(tx.amount), 0)

  const monthlyDebit = transactions
    .filter(tx => tx.type === "debit")
    .reduce((acc, tx) => acc + Number(tx.amount), 0)

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center h-screen bg-gray-50">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
          className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full mb-4"
        />
        <p className="text-gray-500 font-medium">Menyiapkan Wallet Anda...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <Navbar />

      <main className="max-w-2xl mx-auto px-4 pt-8">
        {/* Balance Card Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative overflow-hidden bg-gradient-to-br from-blue-600 to-indigo-700 text-white p-8 rounded-[2.5rem] shadow-2xl mb-8"
        >
          {/* Decorative background elements */}
          <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-48 h-48 bg-blue-400/20 rounded-full blur-2xl" />

          <div className="relative z-10">
            <div className="flex justify-between items-start mb-8">
              <div>
                <p className="text-blue-100 text-sm font-medium tracking-wider uppercase mb-1">Total Saldo</p>
                <h1 className="text-4xl sm:text-5xl font-black tracking-tight">
                  <span className="text-2xl font-normal opacity-80 mr-1">Rp</span>
                  {Number(balance).toLocaleString()}
                </h1>
              </div>
              <div className="bg-white/20 backdrop-blur-md p-3 rounded-2xl">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>

            <div className="flex gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowTopup(true)}
                className="flex-1 bg-white text-blue-700 py-4 rounded-2xl font-bold shadow-lg hover:bg-gray-50 transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                </svg>
                Top Up
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowTransfer(true)}
                className="flex-1 bg-blue-500/30 backdrop-blur-md border border-white/30 text-white py-4 rounded-2xl font-bold hover:bg-blue-500/40 transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M8 5a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L12 8.414V11a1 1 0 102 0V4a1 1 0 00-1-1H8z" />
                </svg>
                Transfer
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-4 mb-10">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-green-50 p-4 rounded-3xl border border-green-100 flex flex-col items-center justify-center text-center"
          >
            <p className="text-[10px] text-green-600 font-bold uppercase tracking-widest mb-1">Masuk</p>
            <p className="text-lg font-black text-green-700">Rp {monthlyCredit.toLocaleString()}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-red-50 p-4 rounded-3xl border border-red-100 flex flex-col items-center justify-center text-center"
          >
            <p className="text-[10px] text-red-600 font-bold uppercase tracking-widest mb-1">Keluar</p>
            <p className="text-lg font-black text-red-700">Rp {monthlyDebit.toLocaleString()}</p>
          </motion.div>
        </div>

        {/* Filters and Search Area */}
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-extrabold text-gray-800">Aktivitas Terbaru</h3>
          <div className="bg-gray-200/50 p-1 rounded-xl flex">
            {['all', 'credit', 'debit'].map((t) => (
              <button
                key={t}
                onClick={() => changeFilter(t)}
                className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all uppercase tracking-tighter cursor-pointer ${filter === t ? "bg-white text-blue-600 shadow-sm" : "text-gray-500 hover:text-gray-700"}`}
              >
                {t === 'all' ? 'Semua' : t === 'credit' ? 'Masuk' : 'Keluar'}
              </button>
            ))}
          </div>
        </div>

        {/* Transactions List */}
        <div className="space-y-4 mb-8">
          <AnimatePresence mode="popLayout">
            {transactions.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-white p-12 rounded-[2rem] shadow-sm border border-gray-100 text-center"
              >
                <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-400">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <p className="text-gray-400 font-medium italic">Belum ada riwayat transaksi</p>
              </motion.div>
            ) : (
              transactions.map((tx, index) => (
                <motion.div
                  key={tx.id}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="group bg-white p-5 rounded-3xl shadow-xs border border-gray-100 flex justify-between items-center hover:shadow-md transition-all duration-300"
                >
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-2xl ${tx.type === 'credit' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                      {tx.type === 'credit' ? (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                        </svg>
                      ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                        </svg>
                      )}
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-800 text-sm sm:text-base leading-tight group-hover:text-blue-600 transition-colors">
                        {tx.description}
                      </h4>
                      <p className="text-xs text-gray-400 font-medium">
                        {new Date(tx.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`font-black text-sm sm:text-base ${tx.type === "credit" ? "text-green-600" : "text-red-600"}`}>
                      {tx.type === "credit" ? "+" : "-"} Rp {Number(tx.amount).toLocaleString()}
                    </p>
                    <p className="text-[9px] text-gray-300 font-mono tracking-tighter uppercase">{tx.reference_id}</p>
                  </div>
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </div>

        {/* Custom Pagination */}
        <div className="flex justify-between items-center bg-white p-4 rounded-3xl shadow-xs border border-gray-100">
          <motion.button
            whileTap={{ scale: 0.9 }}
            disabled={page === 1}
            onClick={() => changePage(page - 1)}
            className="p-2 rounded-xl bg-gray-50 text-gray-600 disabled:opacity-30 disabled:cursor-not-allowed transition-all hover:bg-gray-100 cursor-pointer"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </motion.button>

          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-widest leading-none">Halaman</span>
            <span className="bg-blue-600 text-white w-8 h-8 rounded-lg flex items-center justify-center font-black shadow-lg shadow-blue-200">{page}</span>
            <span className="text-gray-300 font-bold">/</span>
            <span className="text-gray-700 font-bold">{lastPage}</span>
          </div>

          <motion.button
            whileTap={{ scale: 0.9 }}
            disabled={page === lastPage}
            onClick={() => changePage(page + 1)}
            className="p-2 rounded-xl bg-gray-50 text-gray-600 disabled:opacity-30 disabled:cursor-not-allowed transition-all hover:bg-gray-100 cursor-pointer"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
          </motion.button>
        </div>
      </main>

      {/* Modals remain same but can be animated within their components if needed */}
      <AnimatePresence>
        {showTopup && (
          <TopupModal
            close={() => setShowTopup(false)}
            reload={loadData}
          />
        )}
        {showTransfer && (
          <TransferModal
            close={() => setShowTransfer(false)}
            reload={loadData}
          />
        )}
      </AnimatePresence>
    </div>
  )
}