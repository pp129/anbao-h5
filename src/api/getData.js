import axios from 'axios'
export const checkAccount = async () => {
  return axios.get('/webapp/login/checkAccount', {
    params: {
      loginUser: 'admin',
      loginPass: 'U8Wa5n6623eDXmrfaXTKgBxLp4vY0rKJ9O0WYsnkCwAvKeGQH1oKt5jPDxnwwslv4rK42wtcodu89iWH HRhWl8fNkKQirtShWobeWvofVfPTc J u9GP8S5bi0n2Y/GEQfu543a6rPzn6TaPUB te1ZLYcBz NFQEahXrHhGSA'
    }
  }).then(res => {
    if (res.data.flag) {
      return res.data.entity
    } else {
      return false
    }
  }).catch(() => {
    return false
  })
}
export const getByCode = async (code) => {
  return axios.get('/webapp/sysCode/getBycode', {
    params: {
      code: code
    }
  }).then(res => {
    if (res.data.flag) {
      return res.data.entity
    } else {
      return false
    }
  }).catch(() => {
    return false
  })
}
