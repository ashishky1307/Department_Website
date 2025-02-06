const moongose = require('mongoose')

const UserSchema = new moongose.Schema({
    email: String,
    password: String
})

const UserModel = moongose.model("login", UserSchema)
module.exports = UserModel