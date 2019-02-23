import axios from 'axios'

export default() => {
    return axios.create({
        "baseURL": "http://localhost:6513/api/",
        "withCredentials": false,
        headers: {
            
        }
        
    })
}