const { User } = require('../models')
const middleware = require('../middleware')

const Login = async (req, res) => {
  try {
    const user = await User.findOne({
      where: { username: req.body.username }
    })

    if (user) {
      console.log('User found:', user)

      const isValidPassword = await middleware.comparePassword(
        user.passwordDigest,
        req.body.password
      )

      console.log('Is password valid:', isValidPassword)

      if (isValidPassword) {
        let payload = {
          id: user.id,
          username: user.username
        }
        let token = middleware.createToken(payload)
        return res.status(200).send({ user: payload, token })
      } else {
        return res
          .status(401)
          .send({ status: 'Error', msg: 'Invalid Password' })
      }
    } else {
      return res.status(404).send({ status: 'Error', msg: 'User not found' })
    }
  } catch (error) {
    console.log('Error during login:', error)
    return res.status(500).json({ error: error.message })
  }
}

const Register = async (req, res) => {
  try {
    const {
      password,
      username,
      state,
      ZIP,
      firstName,
      DOB,
      email,
      gender,
      ethnicity,
      race
    } = req.body

    if (!username || !password) {
      return res
        .status(400)
        .send({ status: 'Error', msg: 'Username or password missing' })
    }

    let passwordDigest = await middleware.hashPassword(password)
    const user = await User.create({
      username,
      passwordDigest,
      state: state,
      ZIP: ZIP,
      firstName: firstName || null,
      DOB: DOB,
      gender: gender || null,
      email: email,
      ethnicity: ethnicity || null,
      race: race || null
    })
    // Create token after registering the user
    let payload = {
      id: user.id,
      username: user.username
    }
    let token = middleware.createToken(payload)

    // Send both user data and the token in the response
    res.status(201).send({ user, token })
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}

const CheckSession = async (req, res) => {
  try {
    const { payload } = res.locals
    res.status(200).send({ payload })
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}

const UpdatePassword = async (req, res) => {
  try {
    const user = await User.findOne({
      where: { username: req.body.username }
    })
    if (
      user &&
      (await middleware.comparePassword(
        user.dataValues.passwordDigest,
        req.body.oldPassword
      ))
    ) {
      let passwordDigest = await middleware.hashPassword(req.body.newPassword)
      await user.update({ passwordDigest })
      return res
        .status(200)
        .send({ status: 'Success', msg: 'Password updated' })
    }
    res.status(401).send({ status: 'Error', msg: 'Unauthorized' })
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}

module.exports = {
  Login,
  Register,
  CheckSession,
  UpdatePassword
}
