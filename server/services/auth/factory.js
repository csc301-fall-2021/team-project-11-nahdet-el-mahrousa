const { UserDao } = require('../../dao')
const UserService = require('./index')

module.exports = () => {
    const userDao = new UserDao()
    const userService = new UserService(userDao)
    return userService
}