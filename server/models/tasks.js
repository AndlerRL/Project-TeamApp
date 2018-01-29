var models= require('./models'),
    user= require('./users');
   Schema= models.Schema;

var tasksSchema= new Schema({
   description: String,
   user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      profileImg: user.profileImg
   },
   finished: {
      status: {
         type: Boolean,
         default: false
      },
      date: {
          type: Date,
          default: Date()
        }
   }
});

var Tasks= models.model('Task', tasksSchema, 'tasks');

module.exports= Tasks;