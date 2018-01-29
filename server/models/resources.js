var models= require('./models'),
    user= require('./users'),
   Schema= models.Schema;

var resourcesSchema= new Schema({
   files: [{
      type: String
   }],
   sender: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      profileImg: user.profileImg
   },
   receivers: String,
   date: {
      type: Date,
      default: Date()
   },
   subject: String
});
 var Resources= models.model('Resource', resourcesSchema, 'resources');

 module.exports= Resources;