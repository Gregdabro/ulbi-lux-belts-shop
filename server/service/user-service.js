const UserModel = require('../models/user-model');
const UserDto = require('../dtos/user-dto');

class UserService {
    async getAllUsers() {
        const users = await UserModel.find();
        return users.map(user => new UserDto(user));
    }
}

module.exports = new UserService();
