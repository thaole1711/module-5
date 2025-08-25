import axios from "axios";

const API_URL = "http://localhost:3000/students"
export const getAllStudents = async () => {

        try {
            const result = await axios.get(API_URL);
            return result.data;
        } catch (error) {
            return [];
        }
    };
    export const addStudent = async (student) => {
     try{
         const result= await axios.post(API_URL,student);
         if(result.status===201){
             return true;
         }else {
             return false;
         }
     }catch (error){
         return false;
     }
    }