import axios from "axios"
import toast from "react-hot-toast"

const api = axios.create({
  baseURL: "https://wallet.domain-saya.my.id/api",
  headers: {
    Accept: "application/json"
  }
})



api.interceptors.request.use(

  (config) => {

    const token = localStorage.getItem("token")

    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  },

  (error) => Promise.reject(error)

)



api.interceptors.response.use(

  (response) => response,

  (error) => {

    if (!error.response) {
      toast.error("Network error")
      return Promise.reject(error)
    }

    const status = error.response.status

    if (status === 401) {

      toast.error("Session expired, silakan login kembali")

      localStorage.removeItem("token")

      setTimeout(() => {
        window.location.href = "/"
      }, 1000)

    }

    if (status === 422) {

      const errors = error.response.data.errors

      if (errors) {

        Object.values(errors).forEach((err) => {
          toast.error(err[0])
        })

      }

    }

    if (status === 400) {
      toast.error(error.response.data.message)
    }

    if (status === 500) {
      toast.error("Server error")
    }

    return Promise.reject(error)

  }

)

export default api;