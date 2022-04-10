import axios from 'axios'
import store from '../store/index'
let baseUrl = ''
if (process.env.NODE_ENV == 'development') {
    baseUrl = 'http://localhost:3000'
} else {
    baseUrl = 'http://api.safe.demo:3000'
}
let api = {}
api.queryFCData = function () {
    axios.get(baseUrl + '/serve/list').then(res => {
        store.commit('setFCData', res.data.data)
    }).catch(err => {
        console.log(err)
    })
}
api.uploadFile =  function(file){
    return axios.post(baseUrl + '/serve/upload',{file})
}

// api.enterFaceInfo = function(){
//     return axios.get(baseUrl + '/faceinfo/enter')
// }

export default api;


