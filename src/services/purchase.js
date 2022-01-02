import axios from "axios"

const url = process.env.REACT_APP_API_URL+"purchase/" 


const purchaseProduct = async (purchase)=>{
      return axios.post(url+"purchaseProduct",purchase)
}


const service = {purchaseProduct}

export default service