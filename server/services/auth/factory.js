const { UserDao } = require('../../dao')
const UserService = require('./index')

module.exports = () => {
    const UserDao = new UserDao()
    const UserService = new UserService(UserDao)
    return UserService
}