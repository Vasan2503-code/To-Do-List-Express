import axios from "axios";

const api = axios.create({
    baseURL : "https://mern-to-do-list-t1is.onrender.com/api",
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