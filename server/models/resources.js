var models= require('./models'),
   Schema= models.Schema;

var resourcesSchema= new Schema({
   files: [{
      type: String
   }],
   sender: {
      type: Schema.Types.ObjectId,
      ref: 'User'
   },
   receivers: [{
      type: String
   }],
   date: {
      type: Date,
      default: Date()
   },
   subject: String
});
 var Resources= models.model('Resource', resourcesSchema, 'resources');

 module.exports= Resources;