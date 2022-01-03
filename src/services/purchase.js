import axios from "axios"

const url = process.env.REACT_APP_API_URL+"purchase/" 


const getAll = async ()=>{
      const res = await axios.get(url+"getAll")

      return res.data
}

const purchaseProduct = async (purchase)=>{
      return axios.post(url+"purchaseProduct",purchase)
}


const service = {getAll,purchaseProduct}

export default service