import { useState } from "react"
import api from "../api/axios"
import toast from "react-hot-toast"
import { motion } from "framer-motion"

export default function TopupModal({ close, reload }) {
  const [amount, setAmount] = useState("")
  const [loading, setLoading] = useState(false)

  const handleTopup = async () => {
    if (!amount) {
      toast.error("Masukkan jumlah topup")
      return
    }

    try {
      setLoading(true)
      await api.post("/topup", { amount })
      toast.success("Top up berhasil")
      reload()
      close()
    } catch (err) {
      toast.error(err.response?.data?.message || "Top up gagal")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-white/95 backdrop-blur-sm p-8 rounded-3xl shadow-2xl w-full max-w-md relative"
      >
        <button
          onClick={close}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors bg-gray-100 hover:bg-gray-200 rounded-full p-2 cursor-pointer"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>

        <div className="flex justify-center mb-6">
          <div className="bg-green-600 p-4 rounded-2xl shadow-lg text-white">
             <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
             </svg>
          </div>
        </div>

        <h2 className="text-3xl font-extrabold mb-2 text-center text-gray-800">
          Top Up Saldo
        </h2>
        <p className="text-center text-gray-500 mb-8">Tambah saldo Mini Wallet Anda dengan mudah</p>

        <div className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 ml-1">Jumlah Top Up</label>
            <input
              type="number"
              placeholder="Rp 0"
              className="w-full border-gray-200 border p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 transition-all bg-gray-50 focus:bg-white text-lg font-semibold"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>

          <div className="flex gap-3 pt-2">
            <button
              onClick={close}
              className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold p-3 rounded-xl transition duration-200 cursor-pointer"
            >
              Batal
            </button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleTopup}
              disabled={loading}
              className="flex-1 bg-green-600 hover:bg-green-700 text-white font-bold p-3 rounded-xl shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition duration-200 cursor-pointer"
            >
              {loading ? "Memproses..." : "Top Up Sekarang"}
            </motion.button>
          </div>
        </div>
      </motion.div>
    </div>
  )
}