var Chat= require('../models/chat');
var User= require('../models/users');
var ObjectId= require('mongoose').Types.ObjectId;
var async= require('async');
var _= require('lodash');

exports.create_give_conversation= function(req, res, next) {
  if (req.body.receiver !== "general") {
      async.waterfall([
        (callback)=> {
            Chat.findOne({
              $or : [{
                  $and : [{
                    sender: req.session.passport.user._id.toString()
                  },{
                    receiver: req.body.receiver
                  }]
              },{
                  $and: [{
                    receiver: req.session.passport.user._id.toString()
                  },{
                    sender: req.body.receiver
                  }]
              }]
            }).populate('sender').populate('receiver').exec(function(err, chat) {
              console.log("||| Chat ", chat, req.body.receiver); //Optional...
              callback(null, chat);
            });
        }, function(chat, callback) {
            if (chat) {
              var data= whoIsMe(req.session.passport.user, chat);
              callback(null, data);
            } else {
              var chat= new Chat({
                  sender: req.session.passport.user._id.toString(),
                  receiver: req.body.receiver,
                  type: 'private',
                  date: {
                    type: Date,
                    default: Date()
                  }
              });

              chat.save(function(err, chat) {
                  if (!err) {
                    async.waterfall([
                        function(cb) {
                          Chat.populate(chat, {
                              path: 'receiver',
                              model: 'User'
                          }, function(err, s1) {
                              cb(null, s1);
                          });
                        }, function(s1, cb) {
                          Chat.populate(s1, {
                              path: 'sender',
                              model: 'User'
                          }, function(err, s2) {
                              cb(null, s2);
                          });
                        }
                    ], function(err, results) {
                        var data= whoIsMe(req.session.passport.user, results);
                        callback(null, data);
                    });
                  }
              });
            }
          return(null, chat);
        }
      ], function(err, results) {
        res.send(results);
      });
  } else {
      async.waterfall([
        (callback)=> {
            Chat.findOne({
              type: 'general'
            }).exec(function(err, chat) {
              callback(null, chat);
            });
        }, function(chat, callback) {
            if (chat) {
              callback(null, chat);
            } else {
              var chat= new Chat({
                  type: 'general'
              });

              chat.save(function(err, chat) {
                  callback(null, chat);
              });
            }
          return(null, chat);
        }
      ], function(err, results) {
        res.send({ chat : results });
      });
  }
};

/* Next to add/remove
  exports.send_msg= function(req, res, next) {
    if (req.body.type == 'private') {
        Chat.findOne({
          _id: req.body.chat
        },{
          msgs: {
              $slice: 0
          }
        }).exec(function(err, chat) {
          if (!err) {
              var datas= {
                content: req.body.content,
                receiver: req.body.receiver._id,
                sender: req.session.passport.user._id
              };
              chat.msgs.push(datas);
              chat.save(function(err, chat) {
                if (!err) {
                    async.waterfall([
                      function(callback) {
                          User.populate(chat, {
                            path: 'msgs.sender'
                          }, function(err, s1) {
                            if (err) {
                                console.log("Error populate sender ¡!" + err);
                            } else {
                                console.log(s1);
                            }
                            callback(null, s1);
                          });
                      }, function(s1, callback) {
                          User.populate(s1, {
                            path: 'msgs.receiver'
                          }, function(err, s2) {
                            if (err) {
                                console.log("Error populate receiver ¡!" + err);
                            } else {
                                console.log(s1);
                            }
                            callback(null, s2);
                          });
                      }
                    ], function(err, msg) {
                      if (!err) {
                          res.send(msg);
                      } else {
                          res.send({ success: false, message: err });
                      }
                    });
                } else {
                    res.send({ success: false, message: err });
                }
              });
          } else {
              res.send({ success: false, message: err });
          }
        });
    } else if (req.body.type == "general") {
        Chat.findOne({
          type: "general"
        }).exec(function(err, chat) {
          if (!err) {
              var datas= {
                sender: req.body.sender,
                receiver: req.body.receiver,
                content: req.body.content
              };
              chat.msgs.push(datas);
              chat.save(function(err, chat) {
                if (!err) {
                    Chat.populate(chat, {
                      path: 'sender',
                      model: 'User'
                    }, function(err, chat) {
                      res.send(chat);
                    });
                };
              });
          }
        });
    }
  };

  exports.get_general_msgs= function(req, res, next) {
    Chat.find({
        type: 'general'
    }).populate('sender').exec(function(err, chat) {
        if (!err) {
          res.send(chat);
        } else {
          console.log(err);
        }
    });
  };

  exports.get_private_msgs= function(req, res, next) {
    Chat.findOne({
        _id: req.params.id_chat,
        type: 'private'
    }).populate('sender').populate('receiver')
      .populate('msgs.sender').populate('msgs.receiver')
      .exec(function(err, chat) {
          if (!err) {
              var data= whoIsMe(req.session.passport.user, chat);
              res.send(data);
          } else {
              console.log(err);
          }
    });
  };
*/

function whoIsMe(user, chat) {
  var data= {
      chat: chat,
      I: {},
      other: {}
  };

  if (chat.receiver._id == user._id) {
      data.I= chat.receiver;
      data.other= chat.sender;
  } else {
      data.I= chat.sender;
      data.other= chat.receiver;
  }

  return data;
}