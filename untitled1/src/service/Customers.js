import axios from "axios";

const API_URL = "http://localhost:3001/customers"
export const getAllCustomers =async() =>
{
    try {
        const result = await axios.get(API_URL);
        return result.data;
    } catch (error) {
        return [];
    }
};

export const addCustomer =async (customer) => {
   try{
       const result= await axios.post(API_URL,customer);
       if(result.status===201){
           return true;
       }else{
           return false;
       }
   }catch(error){
       return false;
   }
}
export const deleteCustomer = (id) => {
    // Customers = Customers.filter(cus => cus.id !== id);
}