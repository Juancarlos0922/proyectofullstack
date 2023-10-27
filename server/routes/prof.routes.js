const express = require('express');
const router = express.Router();

const Professional    = require('../models/users/Professional.model')


router.get('/getOneProfessional/:id', (req, res) => {
  Professional.findById(req.params.id)
  .then(theProf => res.json(theProf))
  .catch(error => console.log(error))

}) 


router.post('/edit-professional-profile/:id', (req, res) => {
  console.log('estoy en routes')
  
  const {username, email, job, description, localities, imageUrl} = req.body

  Professional.findByIdAndUpdate(req.params.id, 
    {$set:
    {username: username, 
    email: email, 
    job: job, 
    description: description, 
    localities: localities, 
    imageUrl: imageUrl
    }}, 
    { new: true })

  .then(theProfessional => {
    console.log(theProfessional)
    res.json(theProfessional)})
  .catch(error => console.log(error))
})

router.get('/deleteProfessional/:id', (req, res) => {

  Professional.findByIdAndDelete(req.params.id)
  .then((x) => {
    console.log('eliminado de la base de datos')
    res.status(200).json(x)
  })
  .catch(error => console.log(error))
})


router.post('/rateProfessional/id/:id/value/:value', (req, res) => {
  Professional.findByIdAndUpdate(req.params.id, { $push: { rating: req.params.value } }, { new: true })
  .then(theProfessional => { 
    res.json(theProfessional)
  })
  .catch(error => console.log(error))
})



module.exports = router