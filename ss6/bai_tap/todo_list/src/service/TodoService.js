import axios from "axios";
export const getTodo= async ()=>{
    try{
        const result=await axios.get("http://localhost:3088/todo");
        return result.data;
    }catch (error){
        return [];
    }
}
export const addTodo= async (todo)=>{
    try{
        const result =await axios.post("http://localhost:3088/todo",todo);
        if(result.status===201){
            return true;
        }else {
            return false;
        }
    }catch (error){
        return false;
    }
}