import { useState } from "react"
import api from "../api/axios"
import toast from "react-hot-toast"

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

      await api.post("/topup", {
        amount
      })

      toast.success("Top up berhasil")

      reload()
      close()

    } catch (err) {

      toast.error(err.response?.data?.message || "Top up gagal")

    }

    setLoading(false)

  }

  return (

    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">

      <div className="bg-white p-6 rounded-2xl w-80 shadow-xl">

        <h2 className="text-lg font-bold mb-4">
          Top Up Saldo
        </h2>

        <input
          type="number"
          placeholder="Jumlah topup"
          className="w-full border focus:outline-none focus:ring-2 focus:ring-green-400 p-2 rounded mb-4"
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
            onClick={handleTopup}
            disabled={loading}
            className="flex-1 bg-green-500 hover:bg-green-600 text-white p-2 rounded cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed transition duration-200"
          >
            {loading ? "Processing..." : "Top Up"}
          </button>

        </div>

      </div>

    </div>

  )
}