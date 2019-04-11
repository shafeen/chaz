module.exports = {
    name: 'UserModel', service: __, dependencies: ['mongoose', 'bcrypt']
};

function __(mongoose, bcrypt) {
    const userSchema = mongoose.Schema({
        local : {
            email: String,
            password: String
        }
    });

    userSchema.methods.generateHash = function(password) {
        return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
    };

    userSchema.methods.validPassword = function(password) {
        return bcrypt.compareSync(password, this.local.password);
    };

    return mongoose.model('User', userSchema);
}
