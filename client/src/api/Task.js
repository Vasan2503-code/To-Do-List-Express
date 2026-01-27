import axios from "axios";

const api = axios.create({
    baseURL : "http://localhost:3000/api",
    header : {
        "Content-Type" : "application/json"
    }
})

api.interceptors.request.use((req) =>{
    const token = localStorage.getItem("token");
    if(token){
        req.headers.Authorization = `Bearer ${token}`;
    }
    return req;
})

export const  createTask = (formData) => api.post("/createTask" , formData);
export const  getTasks = () => api.get("/getTasks");
export const  updateTask = (formData) => api.put("/updateTask" , formData);
export const  deleteTask = (formData) => api.delete("/deleteTask" , formData);
