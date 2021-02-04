const { User } = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const compare = (pass, hashedPass) => {
  return bcrypt.compareSync(pass, hashedPass);
}

const generateToken = (payload) => {
  return jwt.sign(payload, 'aiueo');
}

class UserController {

  static register ( req, res, next ) {

    const { name, email, password } = req.body;
    const input = { name, email, password };

    User.create(input)
      .then( user => {
        if (user) {
          res.status(201).json({
            success: 'Registration success',
            id: user.id,
            email: user.email
          })
        }
      })
      .catch( err => {
        // next(err);
        res.json(err)
      })

  }

  static login ( req, res, next ) {

    const { email, password } = req.body;

    User.findOne({ where: { email } })
      .then( user => {
        if ( !user ) throw { msg: 'Your email or password is incorrect'};
        const comparedPassword = compare( password, user.password );

        if ( !comparedPassword ) throw { msg: 'Your email or password is incorrect'};
        const payload = {
          id: user.id,
          email: user.email
        }
        const access_token = generateToken(payload)

        res.status(200).json( { access_token } )
      })
      .catch( err => {
        // next(err);
        res.json(err)
      })
  }

}

module.exports = UserController; 