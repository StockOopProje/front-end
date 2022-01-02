import axios from "axios"

const url = process.env.REACT_APP_API_URL+"vendor/" 


const addCustomer = async (vendor)=>{
      return axios.post(url+"addCustomer",vendor)
}

const listSales = async (vendor)=>{
      return axios.post(url+"listSales",vendor)
}

const displayCustomer = async (vendor)=>{
      return axios.post(url+"displayCustomer",vendor
}

const deleteCustomer = async (vendor)=>{
      return axios.post(url+"deleteCustomer",vendor)
}

const updateCustomer = async (vendor)=>{
      return axios.post(url+"updateCustomer",vendor)
}


const service = {addCustomer,listSales,displayCustomer,deleteCustomer,updateCustomer}

export default service