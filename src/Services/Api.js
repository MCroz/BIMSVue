import axios from 'axios'
import store from '../store'

export default() => {
    return axios.create({
        "baseURL": store.state.endpointUrl,
        "withCredentials": false,
        headers: {
            
        }
        
    })
}