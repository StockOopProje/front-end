import axios from "axios"

const url = process.env.REACT_APP_API_URL+"sale/" 


const getAll = async ()=>{
      const res = await axios.get(url+"getAll")

      return res.data
}

const saleProduct = async (sale)=>{
      return axios.post(url+"saleProduct",sale)
}

const deleteSale = async (sale)=>{
      return axios.post(url+"deleteSale",sale)
}



const service = {getAll,saleProduct,deleteSale}

export default service