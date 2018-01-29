angular.module('Teamapp').controller('tasksCtrl', function($scope, $state, TasksService, ToastService, Socket) {
   var checked= [];

   $scope.tasks= [];
   $scope.tasks_finished= [];
   $scope.item_master= {
      description: "",
      date: "",
      finished: false
   };
   $scope.date= new Date();

   $scope.Save= function() {
      TasksService.saveTasks({
         description: $scope.item.description
      }).then(function(response) {
         if (response.data.success) {
            $scope.tasks.push(response.data.task);
            angular.copy($scope.item_master, $scope.item);
         }
      });
   }

   $scope.send_finished= function() {
      var ids= _.pluck(checked, '_id');
      TasksService.saveFinished({ ids: ids }).then(function(response) {
         _.each(response.data, function(item) {
            var item= item;
            //$scope.tasks_finished.push(item);
            _.remove($scope.tasks, function(task) {
               return task._id === item._id;
            });
         });
         Socket.emit('new:task', response.data.populated);
         ToastService.success('You Completed a Task!');
         $state.transitionTo('app.dashboard');
      });
   }

   $scope.orderList= function(response) {
      var finished= [];
      var not_finished= [];
      _.each(response, function(item) {
         if (item.finished.status) {
            finished.push(item);
         } else {
            not_finished.push(item);
         }
      });

      angular.copy(not_finished, $scope.tasks);
      angular.copy(finished, $scope.tasks_finished);
   }

   TasksService.getTasks().then(function(response) {
      $scope.orderList(response.data);
   });

   $scope.$watchCollection("tasks | filter : {finished: {status:true}}", function(newv, old) {
      checked= newv;
   });
});