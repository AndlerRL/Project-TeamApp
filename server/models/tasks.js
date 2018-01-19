var models= require('./models'),
   Schema= models.Schema;

var tasksSchema= new Schema({
   description: String,
   user: {
      type: Schema.Types.ObjectId,
      ref: 'User'
   },
   finished: {
      status: {
         type: Boolean,
         default: false
      },
      date: Date
   }
});

var Tasks= models.model('Task', tasksSchema, 'tasks');

module.exports= Tasks;