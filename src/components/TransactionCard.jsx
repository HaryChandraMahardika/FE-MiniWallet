import { useState } from "react"
import api from "../api/axios"
import toast from "react-hot-toast"

export default function TransferModal({close,reload}){

  const [email,setEmail] = useState("")
  const [amount,setAmount] = useState("")

  const handleTransfer = async () => {

    try{

      await api.post("/transfer",{
        email,
        amount
      })

      toast.success("Transfer berhasil")

      reload()

      close()

    }catch(err){

      toast.error(err.response?.data?.message || "Transfer gagal")

    }

  }

  return(

    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">

      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl w-80">

        <h2 className="text-lg font-bold mb-4">
          Transfer
        </h2>

        <input
          type="email"
          placeholder="Email penerima"
          className="w-full border p-2 rounded mb-3"
          value={email}
          onChange={e=>setEmail(e.target.value)}
        />

        <input
          type="number"
          placeholder="Jumlah"
          className="w-full border p-2 rounded mb-4"
          value={amount}
          onChange={e=>setAmount(e.target.value)}
        />

        <div className="flex gap-2">

          <button
            onClick={close}
            className="flex-1 bg-gray-400 text-white p-2 rounded"
          >
            Batal
          </button>

          <button
            onClick={handleTransfer}
            className="flex-1 bg-purple-500 text-white p-2 rounded"
          >
            Kirim
          </button>

        </div>

      </div>

    </div>
  )
}