var models= require('./models'),
    Schema= models.Schema;

var userSchema= new Schema({
   name: String,
   username: {
      type: String,
      unique: true
   },
   profileImg: String,
   email: String,
   password: String,
   passwordC: String,
   twitter: Schema.Types.Mixed,
   facebook: Schema.Types.Mixed
});

userSchema.methods= {
    authenticate: function(password) {
        return this.password == password;
    }
}

var User= models.model('User', userSchema, 'users');

module.exports= User;