import axios from 'axios'

export default class PartServices {
  constructor() {

    this.service = axios.create({
      baseURL: `${process.env.REACT_APP_URL}`,
      withCredentials: true
    })
  }
  
  getProfessionals = job =>  this.service.get(`search/${job}`)
  getLocalProfessionals = (job, localities) =>  this.service.get(`search/job/${job}/localities/${localities}`)
  getOneProfessional = id => this.service.get(`getOneProfessional/${id}`)
  
  updateFavourites = (partId, profId) =>  this.service.get(`update-favourites/part/${partId}/prof/${profId}`)
  removeFavourites = (partId, profId) =>   this.service.get(`remove-favourites/part/${partId}/prof/${profId}`)
  getMyFavourites = (partId)          =>   this.service.get(`my-favourites/${partId}`)
  removeAllFavourites = (profId)      =>   this.service.get(`remove-from-all-favourites/${profId}`) 
  
  getOneParticular = id => this.service.get(`getOneParticular/${id}`)
  updateParticular = (id, username, email, phoneNumber) => {
    return this.service.post(`edit-particular-profile/${id}`, {username, email, phoneNumber})
  }
  deleteParticular = id => this.service.get(`deleteParticular/${id}`).then(x=> console.log(x))
   
}  