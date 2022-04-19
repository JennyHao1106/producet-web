import axios from 'axios'
import store from '../store/index'
//import qs from 'qs'
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
api.deleteDir = function () {
    return axios.get(baseUrl + '/serve/delteDir');
}
api.uploadFile = function (file) {
    return axios.post(baseUrl + '/serve/upload', file, {
        headers: { "Content-Type": "multipart/form-data" }
    })
}


api.uploadSafeFilePath = function (filepath) {
    return axios.post(baseUrl + '/serve/filePath', {filepath:filepath})
}

api.getSafeFile = function () {
    axios.get(baseUrl + '/serve/safeupload').then(res => { store.commit('setSafeDataData', res.data.data) }).catch(err => { console.log(err) })
}
export default api;


