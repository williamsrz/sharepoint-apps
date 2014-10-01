(function () {
    'use strict';

    // controller
    var controllerName = 'MainController';


    // configuração do controller 
    angular.module('eventosApp')
        .controller(controllerName,
                ['$scope',
                 '$location',
                  MainController
                ]);

    // definição do controller
    function MainController($scope, $location) {

        $scope.titulo = "angular";

        $scope.destaques = function () {
            $location.path("/eventos");
        };

    };

}());