import axios from "axios"

const request = axios.create()

request.interceptors.request.use(config => {
    if(config.method === "put" || config.method === "delete" 
    || (config.url === '/posts/' && config.method ==="post")) {
        const {token} = JSON.parse(localStorage.getItem('user'))
        console.log(token)
        config.headers.Authorization = "Bearer " + token
    }

    return config;
},error => {
    alert("request error")
    return Promise.reject(error)
})

request.interceptors.response.use(response => {
    let res = response.data
    return res
},error => {
    return Promise.reject(error)
})

export const get = (url,params) => {
    return request.get(url,{params})
}

export const post = (url,data) => {
    return request.post(url,data)
}

export const deletePost = (url) => {
    return request.delete(url)
}

export const updatePost = (url,data) => {
    return request.put(url,data)
}

export default request;