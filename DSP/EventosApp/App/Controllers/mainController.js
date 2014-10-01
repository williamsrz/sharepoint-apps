(function () {

    // controller
    var controlerName = 'MainController';


    // definição do controller
    var MainController = function ($scope, $location) {

        $scope.titulo = "angular";

        $scope.destaques = function () {
            $location.path("/eventos");
        };

    };

    // adiciono controller 
    angular.module('eventosApp')
        .controller(controlerName, MainController);

}());