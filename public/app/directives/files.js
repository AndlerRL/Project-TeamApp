angular.module('Teamapp').directive('fileInput', function($parse) {
   return {
      restrict: 'BA',
      template: "<input type='file'/>",
      replace: true,
      link: (scope, ele, attrs)=> {
         var fileGet= $parse(attrs.fileInput);
         var fileSet= fileGet.assign;
         var onChange= $parse(attrs.onChange);

         var updateFile= ()=> {
            scope.$apply(function() {
               fileSet(scope, ele[0]. files[0]);
               onChange(scope);
            });
         };

         ele.bind('change', updateFile);
      }
   }
});