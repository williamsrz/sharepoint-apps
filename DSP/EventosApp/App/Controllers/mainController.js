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
                 'EventosService',
                  MainController
                ]);

    // definição do controller
    function MainController($scope, $log, $location, EventosService) {

        $scope.titulo = "Eventos em Destaque";
        $scope.eventos = EventosService.listar;

        $scope.detalhar = function (evento) {
            $location.path("/eventos/detalhar/" + evento.id);
        };

        $log.info('Controller [' + controllerName + '] carregado!');
    };

}());