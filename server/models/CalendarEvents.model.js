const mongoose = require('mongoose')
const Schema = mongoose.Schema

const calendarEventsSchema = new Schema({
  date: {type: String, require:true},
  event: {type: String, require: true},
  particularId: {type: Schema.Types.ObjectId, require: true},
  particularName: {type: String, require: true},
  particularEmail: {type: String, require: true},
  particularPhone: {type: String, require: true},
  professionalId: {type: Schema.Types.ObjectId, require: true},
  sentEmail: {type: Boolean,
              default: false}
              }, 
  {timestamps: true}
)

const CalendarEvents = mongoose.model('CalendarEvents', calendarEventsSchema)
module.exports = CalendarEvents