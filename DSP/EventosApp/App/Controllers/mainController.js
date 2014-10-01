(function () {
    'use strict';

    // controller
    var controllerName = 'MainController';


    // configuração do controller 
    angular.module('eventosApp')
        .controller(controllerName,
                ['$scope',
                 '$log',
                 '$location',
                  MainController
                ]);

    // definição do controller
    function MainController($scope, $log, $location) {

        $scope.titulo = "angular";

        $scope.destaques = function () {
            $location.path("/eventos");
        };

        $log.info('Controller [' + controllerName + '] carregado!');
    };

}());