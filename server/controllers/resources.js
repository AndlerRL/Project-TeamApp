var Resource= require('../models/resources');
var ObjectId= require('mongoose').Types.ObjectId;

var fs= require('fs');
var _= require('lodash');
var path= require('path');
var async= require('async');

var newResource= new Resource({});

exports.saveResource= function(req, res, next) {
   async.series({
      files: function(callback) {
         if (req.files.hasOwnProperty('files')) {
            if (req.files.file.length > 0) {
               var result= _.map(req.files.file, function(file, i) {
                  return save_files(req, res, i, file);
               });
               callback(null, result);
            } else {
               callback(null, save_files(req, res, 0, req.files.file));
            }
         } else {
            callback(null, []);
         }
      },
      Data: function(callback) {
         var data= {
            sender: ObjectId(req.session.passport.user._id.toString()),
            receivers: req.body.receivers.split(','),
            subject: req.body.subject 
         }
         callback(null, data);
      }
   }, function(err, result) {
      if (!err) {
         save_resource(result, function(resource) {
            Resource.populate(resource, {
               path: 'sender',
               model: 'User',
               select: 'name username'
            }, function(err, resource) {
               req.body.resource= resource;
               res.send(resource);
               next();
            });
         });
      } else {
         res.send({ msg: 'Failed' });
         console.log(err);
      }
   });
};

exports.getReceivedResources= function(req, res, next) {
   Resource.find({
      receivers: req.session.passport.user.username
   }).populate('sender').exec(function(err, resources) {
      if (err) { console.log(err); } else { res.send(resources); }
   });
};

exports.getSentResources= function(req, res, next) {
   console.log('Resources Sent');
   Resource.find({
      sender: req.session.passport.user._id
   }).populate('sender').exec(function(err, resources) {
      if (err) { console.log(err) } else { res.send(resources); }
   });
};

exports.getDetailResource= function(req, res, next) {
   console.log(req.params.id_resource, "Detail");
   Resource.findOne({_id:req.params.id_resource}).populate('sender').exec(function(err, resource) {
      if (!err) { res.send(resource); } else { console.log(resource); }
   });
}

function save_files(req, res, i, file) {
   var root= path.dirname(require.main.filename);
   var originalFilename= file.originalFilename.split('.');
   var ext= originalFilename[originalFilename.length - 1];
   var file_name= newResource._id.toString() + '_' + i + '.' + ext;
   var newPath= root + '/public/resources/' + file_name;
   var newFile= new fs.createWriteStream(newPath);
   var oldFile= new fs.createReadStream(file.path);
   var total_bytes= req.headers['content-length'];
   var uploaded_bytes= 0;

   oldFile.pipe(newFile);
   oldFile.on('data', function(chunk) {
      uploaded_bytes += chunk.length;
      var progress= (uploaded_bytes / total_bytes) * 100;
      console.log('Progress: ' + parseInt(progress, 10) + '%\n');
   });

   oldFile.on('end', function() {
      console.log('Upload Completed');
      res.end('Upload Completed');
   });

   return file_name;
}

function save_resource(result, callback) {
   if (Array.isArray(result.files)) {
      newResource.files= result.files;
   } else {
      newResource.files.push(result.files);
   }
   newResource.subject= result.Data.subject;
   newResource.receivers= result.Data.receivers;
   newResource.sender= result.Data.sender;
   newResource.save();
   callback(newResource);
}