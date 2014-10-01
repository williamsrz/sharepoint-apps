(function () {
    'use strict';

    // nome controller
    var controllerName = 'DetalharEventosController';

    // configuração do controller 
    angular.module('eventosApp')
        .controller(controllerName,
                ['$scope',
                 '$log',
                 '$location',
                 '$routeParams',
                 'EventosService',
                  DetalharEventosController
                ]);

    // definição do controller
    function DetalharEventosController($scope, $log, $location, $routeParams, EventosService) {

        var eventoId = $routeParams.id;

        $scope.titulo = "Eventos em Destaque";

        $scope.evento = EventosService.listar[eventoId - 1];

        $scope.inscricao = function (evento) {
            var confirmado = confirm('Confirma sua inscrição no evento ' + evento.titulo + '?');

            if (confirmado) {
                $location.path("/eventos");
            }
        };

        $log.info('Controller [' + controllerName + '] carregado!');
    };

}());