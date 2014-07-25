var myDirectives = angular.module("myDirectives", ["ngResource"]);

myDirectives.directive('calendar', function ($parse) {
    return function (scope, element, attrs, controller) {
        var ngModel = $parse(attrs.ngModel);

        $(function(){
            $(element).datepicker({
            	showAnim: "slideDown",
            	dateFormat: "yy-mm-dd",
            	onSelect:function (dateText, inst) {
                    scope.$apply(function(scope){
                        // Change binded variable
                        ngModel.assign(scope, dateText);
                    });
               }
            });
        });
    }
});