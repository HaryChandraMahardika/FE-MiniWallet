import { useState } from "react"
import api from "../api/axios"
import toast from "react-hot-toast"

export default function TransferModal({ close, reload }) {

  const [email, setEmail] = useState("")
  const [amount, setAmount] = useState("")
  const [loading, setLoading] = useState(false)

  const handleTransfer = async () => {

    if (!email || !amount) {
      toast.error("Email dan jumlah harus diisi")
      return
    }

    try {

      setLoading(true)

      await api.post("/transfer", {
        email,
        amount
      })

      toast.success("Transfer berhasil")

      reload()
      close()

    } catch (err) {

      toast.error(err.response?.data?.message || "Transfer gagal")

    }

    setLoading(false)

  }

  return (

    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">

      <div className="bg-white p-6 rounded-2xl w-80 shadow-xl">

        <h2 className="text-lg font-bold mb-4">
          Transfer Saldo
        </h2>

        <input
          type="email"
          placeholder="Email penerima"
          className="border focus:outline-none focus:ring-2 focus:ring-indigo-400 w-full p-2 rounded mb-3"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="number"
          placeholder="Jumlah transfer"
          className="border focus:outline-none focus:ring-2 focus:ring-indigo-400 w-full p-2 rounded mb-4"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <div className="flex gap-2">

          <button
            onClick={close}
            className="flex-1 bg-gray-300 hover:bg-gray-400 p-2 rounded cursor-pointer transition duration-200"
          >
            Cancel
          </button>

          <button
            onClick={handleTransfer}
            disabled={loading}
            className="flex-1 bg-indigo-500 hover:bg-indigo-600 text-white p-2 rounded cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed transition duration-200"
          >
            {loading ? "Processing..." : "Transfer"}
          </button>

        </div>

      </div>

    </div>

  )
}