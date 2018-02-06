var models= require('./models'),
   Schema= models.Schema;

var chatSchema= new Schema({
   sender: {
      type: Schema.Types.ObjectId,
      ref: 'User',
   },
   receiver: {
      type: Schema.Types.ObjectId,
      ref: 'User'
   },
   type: String,
   msgs: [{
      sender: {
         type: Schema.Types.ObjectId,
         ref: 'User'
      },
      receiver: {
         type: Schema.Types.ObjectId,
         ref: 'User'
      },
      content: String,
      date: {
         type: Date,
         default: Date()
      }
   }]
});

var Chat= models.model('Chat', chatSchema, 'chats');

module.exports= Chat;