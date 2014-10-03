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
                 'SharePointEventosService',
                  DetalharEventosController
                ]);

    // definição do controller
    function DetalharEventosController($scope, $log, $location, $routeParams, SharePointEventosService) {

        var eventoId = $routeParams.id;

        $scope.titulo = "Eventos em Destaque";

        $scope.evento = SharePointEventosService.detalhar($scope, eventoId);

        $scope.inscricao = function (evento) {
            var confirmado = confirm('Confirma sua inscrição no evento ' + evento.titulo + '?');

            if (confirmado) {
                $location.path("/eventos");
            }
        };

        $log.info('Controller [' + controllerName + '] carregado!');
    };

}());