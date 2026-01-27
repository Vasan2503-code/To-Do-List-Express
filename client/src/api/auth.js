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

export const register = (formData) => api.post("/register" , formData);
export const login = (formData) => api.post("/login" , formData);