import Api from '@/Services/Api'
import axios from 'axios'

export default {
    login (data) {
        return Api().post('Login/InitialLogin',JSON.stringify(data));
    },
    login1 (data) {
        return axios({
            method: 'post',
            url: 'http://localhost:6513/api/Login/InitialLogin',
            data: data,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                'Accept': 'application/json'
            }
          });
    }
}