import axios from "axios"

const url = process.env.REACT_APP_API_URL+"vendor/" 

const getAll = async ()=>{
      const res = await axios.get(url+"getAll")

      return res.data
}

const addVendor = async (vendor)=>{
      return axios.post(url+"addVendor",vendor)
}

const listPurchases = async (vendor)=>{
      return axios.post(url+"listPurchases",vendor)
}

const displayVendor = async (vendor)=>{
      return axios.post(url+"displayVendor",vendor)
}

const deleteVendor = async (vendor)=>{
      return axios.post(url+"deleteVendor",vendor)
}

const updateVendor = async (vendor)=>{
      return axios.post(url+"updateVendor",vendor)
}


const service = {getAll,addVendor,listPurchases,displayVendor,deleteVendor,updateVendor}

export default service