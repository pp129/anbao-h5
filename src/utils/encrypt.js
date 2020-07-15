import JSEncrypt from 'jsencrypt'
export default (password) => {
  const publicKey = 'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCxesfHzXbRZ/QCYFr9uhj+OhYuvw7qJC5o6MCexJoNrxu6a9aLXvz9OMXIQMpvcbGua1E1MXcTiaHTRTphaSOYhtVNdef5EaTy/LHcovzNF05xTLI9/32239hMykJTWtp0z/IeZOBT6lVN30WQBvOfP7CnTyVHZ9jtPqW0OAQSPwIDAQAB'
  const encrypt = new JSEncrypt()
  encrypt.setPublicKey(publicKey)
  return encrypt.encrypt(password)
}
