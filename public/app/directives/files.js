angular.module('Teamapp').directive('fileInput', function($parse) {
   return {
      restrict: 'A',
      link: function(scope, ele, attrs) {
         ele.bind('change', function() {
            $parse(attrs.fileInput).assign(scope, ele[0].files)
            scope.$apply();
         });
      }
   }
});