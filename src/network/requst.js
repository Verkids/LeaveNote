// import axios from 'axios'

// export function request (config){
//     return new Promise((resolve,reject) => {
//         //1.创建aioxs的实例
//         const instance = axios.create({
//             // baseURL: 'http://123.207.32.32:8000',
//             timeout: 5000
//         })
//         //发送真正的网络请求
//         return instance(config)
// }












     //发送真正的网络请求
     //     instance(config)
     //     .then(res => {
     //         resolve(res)
     //     })
     //     .catch(res => {
     //         reject(err)
     //     })
     // })

// export function request (config, success, failure){
//     //1.创建aioxs的实例
//     const instance = axios.create({
//         baseURL: 'http://123.207.32.32:8000',
//         timeout: 5000
//     })

//     //发送真正的网络请求
//     instance(config.baseConfig)
//         .then(res => {
//             // console.log(rse);
//             config.success(res)
//         })
//         .catch(res => {
//             // console.log(err);
//             config.failure(err)
//         })

// }