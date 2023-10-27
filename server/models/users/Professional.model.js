const mongoose = require('mongoose')
const Schema = mongoose.Schema

const professionalSchema = new Schema({
  username: {type: String, require:true},
  email:    {type: String, require: true},
  imageUrl: { type: String},
  rating: {type: Array},
  password: {type: String, require: true},
  job:     {type: String, require: true},
  description: {type: String, require: true},
  localities: {type: String, require: true},
  role: {
    type: String,
    enum: ['PROF', 'ADMIN'],
    default: 'PROF'
  },
  }, 
  {timestamps: true}
)



const Professional = mongoose.model('Professional', professionalSchema)
module.exports = Professional