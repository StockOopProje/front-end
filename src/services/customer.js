import axios from "axios"

const url = process.env.REACT_APP_API_URL+"customer/" 


const addCustomer = async (customer)=>{
      return axios.post(url+"addCustomer",customer)
}

const listSales = async (customer)=>{
      return axios.post(url+"listSales",customer)
}

const displayCustomer = async (customer)=>{
      return axios.post(url+"displayCustomer",customer)
}

const deleteCustomer = async (customer)=>{
      return axios.post(url+"deleteCustomer",customer)
}

const updateCustomer = async (customer)=>{
      return axios.post(url+"updateCustomer",customer)
}


const service = {addCustomer,listSales,displayCustomer,deleteCustomer,updateCustomer}

export default service