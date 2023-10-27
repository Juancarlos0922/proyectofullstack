const express    = require('express')
const authRoutes = express.Router()

const passport   = require('passport')
const bcrypt     = require('bcryptjs')


const Particular    = require('../models/users/Particular.model')
const Professional  = require('../models/users/Professional.model')

// RUTAS DE SIGNUP Y LOGIN PARA EL PARTICULAR


authRoutes.post('/particular/signup', (req, res, next) => {

    const { username, email, phoneNumber, password } = req.body
  
    if (!username || !password) {
      res.status(400).json({ message: 'Por favor, introduce tu email y una contraseña' })
      return
    }

    if(password.length < 7){
        res.status(400).json({ message: 'Debes introducir una contraseña de al menos 8 caracteres.' })
        return
    }
    if (phoneNumber !== /\d{6}/) {
        res.status(400).json({ message: 'Debes introducir un número de 6 dígitos sin espacios.'})
        return
    }

    Particular.findOne({ username }, (err, foundUser) => {

        if(err){
            res.status(500).json({message: "Algo salió mal en la comprobación del usuario, inténtalo de nuevo"})
            return
        }
        if (foundUser) {
            res.status(400).json({ message: 'Ya existe un usuario registrado con este nombre' })
            return
        }
  
        const salt     = bcrypt.genSaltSync(10)
        const hashPass = bcrypt.hashSync(password, salt)

  
        const NewPart = new Particular({
            username:username,
            email: email,
            phoneNumber: phoneNumber,
            password: hashPass,
        });
  
        NewPart.save(err => {
            if (err) {
                res.status(400).json({ message: 'Algo no ha ido bien al guardar tus datos, por favor inténtalo de nuevo' })
                return
            }
            req.login(NewPart, (err) => {

                if (err) {
                    res.status(500).json({ message: 'Algo no ha ido bien en el proceso de acceso tras el registro.' })
                    return
                }          
                res.status(200).json(NewPart)

            })
        })
    })
})


authRoutes.post('/particular/login', (req, res, next) => {
  passport.authenticate('local-particular', (err, theUser, failureDetails) => {
      if (err) {
          res.status(500).json({ message: 'Lo sentimos pero ha ocurrido un fallo en la autenticación del usuario.' });
          return
      }
  
      if (!theUser) {

          res.status(401).json(failureDetails);
          return;
      }

      req.login(theUser, (err) => {
          if (err) {
              res.status(500).json({ message: 'Lo sentimos pero ha ocurrido un fallo al guardar la sesión .' })
              return;
          }

          res.status(200).json(theUser)
      })    
  })(req, res, next);
})



// RUTAS DE SIGNUP Y LOGIN PARA EL PROFESIONAL


authRoutes.post('/professional/signup', (req, res, next) => {

    const { username, email, password, job, description, localities, imageUrl } = req.body
  
    if (!username || !password) {
      res.status(400).json({ message: 'Por favor, introduce tu email y una contraseña' })
      return
    }

    if(password.length < 7){
        res.status(400).json({ message: 'Debes introducir una contraseña de al menos 8 caracteres.' })
        return
    }
  
    Professional.findOne({ username }, (err, foundUser) => {

        if(err){
            res.status(500).json({message: "Algo salió mal en la comprobación del usuario, inténtalo de nuevo"})
            return
        }
        if (foundUser) {
            res.status(400).json({ message: 'Ya existe un usuario registrado con este nombre' })
            return
        }
  
        const salt     = bcrypt.genSaltSync(10)
        const hashPass = bcrypt.hashSync(password, salt)

  
        const NewPart = new Professional({
            username:username,
            email: email,
            password: hashPass,
            job: job,
            description: description,
            localities: localities,
            imageUrl: imageUrl
        });

        console.log(NewPart)
  
        NewPart.save(err => {
            if (err) {
                console.log(err)
                res.status(400).json({ message: 'Algo no ha ido bien al guardar tus datos, por favor inténtalo de nuevo' })
                return
            }
            req.login(NewPart, (err) => {

                if (err) {
                    res.status(500).json({ message: 'Algo no ha ido bien en el proceso de acceso tras el registro.' })
                    return
                }          
                res.status(200).json(NewPart)

            })
        })

    })
})    
    
    
authRoutes.post('/professional/login', (req, res, next) => {
  passport.authenticate('local-professional', (err, theUser, failureDetails) => {
      if (err) {
          res.status(500).json({ message: 'Lo sentimos pero ha ocurrido un fallo en la autenticación del usuario.' });
          return
      }
  
      if (!theUser) {

          res.status(401).json(failureDetails);
          return;
      }

      req.login(theUser, (err) => {
          if (err) {
              res.status(500).json({ message: 'Lo sentimos pero ha ocurrido un fallo al guardar la sesión .' })
              return;
          }

          res.status(200).json(theUser)
      })    
  })(req, res, next);
})



// LOGOUT Y LOGGEDIN COMUNES


authRoutes.post('/logout', (req, res, next) => {
  req.logout()
  console.log("logout")
  res.status(200).json({ message: 'Has cerrado tu sesión' })
})


authRoutes.get('/loggedin', (req, res, next) => {
  if (req.isAuthenticated()) {
      res.status(200).json(req.user);
      return;
  }
  res.status(403).json({ message: 'No tienes acceso. Entra con tu cuenta o regístrate como nuevo usuario' })
})




module.exports = authRoutes