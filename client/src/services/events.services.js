import axios from 'axios'

export default class EventsServices {
  constructor() {

      this.service = axios.create({
        baseURL: `${process.env.REACT_APP_URL}`,
        withCredentials: true
      })
  }

 postEvents = theNewEvent => this.service.post(`postEvents`, theNewEvent)
 getProfEvents = profId => this.service.get(`getProfEvents/${profId}`) 

}