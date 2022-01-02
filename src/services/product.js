import axios from "axios"

const url = process.env.REACT_APP_API_URL+"product/" 


const getAll = async ()=>{
      const res = await axios.get(url+"getAll")

      return res.data
}

const isEnoughStock = async (product)=>{
      return axios.post(url+"isEnoughStock",product)
}

const addProduct = async (product)=>{
      return axios.post(url+"addProduct",product)
}

const displayProduct = async (product)=>{
      return axios.post(url+"displayProduct",product)
}

const deleteProduct = async (product)=>{
      return axios.post(url+"deleteProduct",product)
}

const updateProduct = async (product)=>{
      return axios.post(url+"updateProduct",product)
}


const service = {getAll,isEnoughStock,addProduct,displayProduct,deleteProduct,updateProduct}

export default service