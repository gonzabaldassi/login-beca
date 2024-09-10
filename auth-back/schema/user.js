const Mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = new Mongoose.Schema({
    id: {type: Object},
    username: {type: String, required: true, unique: true},
    password:{type: String, required: true},
    name:{type: String, required: true},
});

//Pre es metodo para ejecutar antes de que se ejecute una transaccion en mongo
UserSchema.pre('save', function(next){
    if (this.isModified('password') || this.isNew) {
        const document = this;

        bcrypt.hash(document.password, 10, (err,hash)=>{
            if (err) {
                next(err);
            }else{
                document.password = hash;
                next(); // Hace que se complete la transaccion
            }
        })
        
    }else{
        next();
    }
})

UserSchema.methods.usernameExist = async function (username) {
    const result = await Mongoose.model('User').find({username});

    return result.length > 0;
}

UserSchema.methods.comparePassword = async function(pass, hash) {
    const same = await bcrypt.compare(pass, hash);
    return same;
} 

module.exports = Mongoose.model("User", UserSchema);