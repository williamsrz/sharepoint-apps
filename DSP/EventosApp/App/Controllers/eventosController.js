(function () {

    'use strict';

    // Controller
    var controlerName = 'eventosController';

    angular
        .module('eventosApp')
        .controller(controlerName, ['$scope', 'eventosService', eventosController]);

    function eventosController($scope, eventosService) {
        $scope.eventos = eventosService.listar;

        $scope.detalhar = function (evento) {
            alert(evento.titulo);
        };
    };

}());