import axios from 'axios'

export default class AuthServices {
  constructor() {

      this.service = axios.create({
        baseURL: `${process.env.REACT_APP_URL}`,
        withCredentials: true
      })
  }

    signupPart = (username, email,phoneNumber, password) => this.service.post('particular/signup', {username, email, phoneNumber, password})
    loginPart = (username, password) => this.service.post('particular/login', {username, password})
  
    signupProf = (formData) => {
      const {username, email, password, job, description, localities, imageUrl} = formData
      return this.service.post('professional/signup', {username, email, password, job, description, localities, imageUrl}
      )}
    loginProf = (username, password) => this.service.post('professional/login', {username, password})
 
    handleUpload = theFile => this.service.post('/upload', theFile)
  

    logout = () => {
      console.log("service de logout")
     return this.service.post('logout')
    }
    loggedin = () => this.service.get('loggedin')

}