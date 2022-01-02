import axios from "axios"

const url = process.env.REACT_APP_API_URL+"sale/" 

const saleProduct = async (sale)=>{
      return axios.post(url+"saleProduct",sale)
}


const service = {saleProduct}

export default service