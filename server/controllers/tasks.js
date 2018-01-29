var Tasks= require('../models/tasks');
var ObjectId= require('mongoose').Types.ObjectId;
var _= require('lodash');

exports.Save= function(req, res, next) {
   var tasks= new Tasks({
      description: req.body.description,
      user: req.session.passport.user._id.toString()
   });

   tasks.save(function(err, task) {
      if (err) {
         console.log('[ERROR] ' + err);
         res.send({ success: false, message: err });
      } else {
         console.log('Saved successfully');
         res.send({ success: true, task: task });
      }
   });
};

exports.getTasks= function(req, res, next) {
   Tasks.find({ user: req.session.passport.user._id.toString() })
   .exec(function(err, tasks) {
      if (err) {
         console.log('[Error] ' + err);
      } else {
         res.send(tasks);
      }
   });
};

exports.saveFinished= function(req, res, next) {
   var ids= req.body.ids;

   Tasks.find({ _id: { $in:ids } })
   .exec(function(err, tasks) {
      if (err) {
         console.log('[Error] ' + err);
      } else {
         _.each(tasks, function(task) {
            task.finished.status= true;
            task.finished.date= new Date();
            task.save();
         });
         req.body.tasks= tasks;
         res.send(tasks);
         next();
      }
   });
};