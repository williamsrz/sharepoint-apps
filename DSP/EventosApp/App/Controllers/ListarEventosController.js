(function () {
    'use strict';

    // nome controller
    var controllerName = 'ListarEventosController';

    // configuração do controller 
    angular.module('eventosApp')
        .controller(controllerName,
                ['$scope',
                 '$log',
                 '$location',
                 '$routeParams',
                 'EventosService',
                  ListarEventosController
                ]);


    // definição do controller
    function ListarEventosController($scope, $log, $location, $routeParams, EventosService) {

        $scope.titulo = "Todos os Eventos";
        $scope.eventos = EventosService.listar;

        $scope.detalhar = function (evento) {
            $location.path("/eventos/detalhar/" + evento.id);
        };

        $log.info('Controller [' + controllerName + '] carregado!');

    };


}());