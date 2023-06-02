const UserModel = require("../schemas/user");

class User {
    static async create({newUser}) {
        const createNewUser = await UserModel.create(newUser);
        return createNewUser;
    }

    static async findByEmail() {
        const user = await UserModel.find({});
        return user;
    }
}

module.exports = User;