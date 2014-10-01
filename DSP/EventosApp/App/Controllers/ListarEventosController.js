(function () {
    'use strict';

    // nome controller
    var controllerName = 'ListarEventosController';

    // configuração do controller 
    angular.module('eventosApp')
        .controller(controllerName,
                ['$scope',
                 '$location',
                 '$routeParams',
                 'EventosService',
                  ListarEventosController
                ]);


    // definição do controller
    function ListarEventosController($scope, $location, $routeParams, EventosService) {

        $scope.titulo = "Eventos em Destaque";
        $scope.eventos = EventosService.listar;

        $scope.detalhar = function (evento) {
            $location.path("/eventos/detalhar/" + evento.id);
        };

    };


}());