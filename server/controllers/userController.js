const { User } = require('../models');
const { compare } = require('../helpers/bcrypt');
const { generateToken } = require('../helpers/jwt')

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
        next(err);
      })

  }

  static login ( req, res, next ) {

    const { email, password } = req.body;

    User.findOne({ where: { email } })
      .then( user => {
        if ( !user ) throw { msg: 'Your email or password is incorrect', status: 400 };
        const comparedPassword = compare( password, user.password );

        if ( !comparedPassword ) throw { msg: 'Your email or password is incorrect', status: 400 };
        const payload = {
          id: user.id,
          email: user.email
        }
        const access_token = generateToken(payload)

        res.status(200).json( { access_token } )
      })
      .catch( err => {
        next(err);
      })
  }

}

module.exports = UserController; 