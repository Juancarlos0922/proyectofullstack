const Particular    = require('../models/users/Particular.model')
const Professional  = require('../models/users/Professional.model')
const LocalStrategy = require('passport-local').Strategy
const bcrypt        = require('bcryptjs')
const passport      = require('passport')

passport.serializeUser((obj, done) => {

  if (obj instanceof Particular) {
    done(null, { id: obj.id, type: 'Particular' });
  } else {
    done(null, { id: obj.id, type: 'Professional' });
  }

});

passport.deserializeUser((obj, cb) => {

  if (obj.type === 'Particular') {
    Particular.findById(obj.id, (err, userDocument) => {
        if (err) {
          cb(err)
          return
        }
        cb(null, userDocument)
      })

  } else {
    Professional.findById(obj.id, (err, userDocument) => {
      if (err) {
        cb(err)
        return
      }
      cb(null, userDocument)
    })
  }

})

//  ESTRATEGIA PARA EL PARTICULAR


passport.use('local-particular', new LocalStrategy((username, password, next) => {
  Particular.findOne({ username }, (err, foundUser) => {
    if (err) {
      next(err)
      return
    }

    if (!foundUser) {
      next(null, false, { message: 'Usuario no registrado.' })
      return
    }

    if (!bcrypt.compareSync(password, foundUser.password)) {
      next(null, false, { message: 'Contraseña incorrecta.' })
      return
    }

    next(null, foundUser);
  })
}))

//  ESTRATEGIA PARA EL PROFESIONAL

passport.use('local-professional', new LocalStrategy((username, password, next) => {
  Professional.findOne({ username }, (err, foundUser) => {
    if (err) {
      next(err)
      return
    }

    if (!foundUser) {
      next(null, false, { message: 'Usuario no registrado.' })
      return
    }

    if (!bcrypt.compareSync(password, foundUser.password)) {
      next(null, false, { message: 'Contraseña incorrecta.' })
      return
    }

    next(null, foundUser);
  })
}))
