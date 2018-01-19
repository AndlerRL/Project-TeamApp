var models= ('./models'),
   Schema= models.Schema;

var userSchema= new Schema({
   name: String,
   username: {
      type: String,
      unique: true
   },
   password: String,
   twitter: String
});

var User= models.model('User', userSchema, 'users');

module.exports= User;