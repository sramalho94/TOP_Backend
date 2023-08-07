const { User } = require('../models')

class UserController {
  async getAllUsers(req, res) {
    try {
      const users = await User.findAll()
      return res.status(200).json({ users })
    } catch (error) {
      return res.status(500).send(error.message)
    }
  }
  async getUserById(req, res) {
    try {
      const { id } = req.params
      const user = await User.findOne({
        where: { id: id }
      })
      if (user) {
        return res.status(200).json({ user })
      }
      return res.status(404).send('User with the specified ID does not exist')
    } catch (error) {
      return res.status(500).send(error.message)
    }
  }

  async updateUser(req, res) {
    try {
      console.log('req.body', req.body) // Debugging
      const { id } = req.params
      console.log('Updating user with ID:', id) // Debugging

      const updated = await User.update(req.body, {
        where: { id: id }
      })

      console.log('Updated:', updated) // Debugging

      if (updated) {
        const updatedUser = await User.findOne({ where: { id: id } })
        return res.status(200).json({ user: updatedUser })
      }
      throw new Error('User not found')
    } catch (error) {
      console.log('Error in updateUser:', error) // Debugging
      return res.status(500).send(error.message)
    }
  }

  async deleteUser(req, res) {
    try {
      const { id } = req.params
      const deleted = await User.destroy({
        where: { id: id }
      })
      if (deleted) {
        return res.status(204).send('User deleted')
      }
      throw new Error('User not found')
    } catch (error) {
      return res.status(500).send(error.message)
    }
  }
}

module.exports = new UserController()
