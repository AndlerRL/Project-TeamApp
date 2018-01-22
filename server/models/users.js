var models= require('./models'),
    Schema= models.Schema;

var userSchema= new Schema({
   name: String,
   username: {
      type:String,
      unique: true
   },
   password: String,
   twitter: Schema.Types.Mixed
});

userSchema.methods= {
    authenticate: function(password) {
        return this.password == password;
    }
}

var User= models.model('User', userSchema, 'users');

module.exports= User;