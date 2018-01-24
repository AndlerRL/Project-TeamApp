var Timeline= require('../models/timeline');
var Tasks= require('../models/tasks');

var ObjectId= require('mongoose').Types.ObjectId;
var _= require('lodash');
var async= require('async');

exports.finishedTask= function(req, res, next) {
   var items= function(task, callback) {
      var timeline= new Timeline({
         user: ObjectId(task.user.toString()),
         task: ObjectId(task._id.toString()),
         action: ' Finished a task',
         description: task.description,
         type: 'task'
      });

      timeline.save(function(err, item) {
         if (!err) {
            console.log('Action Saved');
            return callback(null, item);
         }
      });
   }
   async.map(req.body.tasks, items, function(err, result) {
      async.waterfall([
         function(callback) {
            Timeline.populate(result, {
               path: 'user',
               model: 'User'
            }, function(err, items) {
               callback(null, items);
            });
         }, 
         function (items, callback) {
            Timeline.populate(items, {
               path: 'task',
               model: 'Task'
            }, function(err, items) {
               callback(null, items);
            });
         }
      ], function(err, data) {
            if (!err) {
               res.send({
                  populated: data,
                  lean: req.body.tasks
               });
               console.log('Action Saved');
               console.log('task');
            } else { console.log(err); }
      });
   });
};

exports.sentResource= function(req, res, next) {
   var timeline= new Timeline({
      resource: req.body.resource._id,
      action: ' Shared a resource',
      description: req.body.resource.subject,
      type: 'resource'
   });

   timeline.save(function(err, resource) {
      if (!err) { console.log('Action Saved'); console.log('Resource'); }
   });
};

exports.getTimeline= function(req, res, next) {
   var d= new Date();
   var year= d.getFullYear();
   var month= d.getMonth();
   var day= d.getDate();

   console.log('Date: ', new Date(month, day, year));

   Timeline.find({ date: { $gte: new Date(month, day, year) } }).populate('user task resource').exec(function(err, docs) {
      if (!err) {
         Timeline.populate(docs, {
            path: 'resource.sender',
            model: 'User'
         },
         function(err, items) {
            res.send(items);
         });
      } else { 
         console.log(err);
      }
   });
};