//(function () {

//    'use strict';

//    // Controller
//    var controlerName = 'eventosController';

//    angular
//        .module('eventosApp')
//        .controller(controlerName, ['$scope', 'eventosService', eventosController]);

//    function eventosController($scope, eventosService) {
//        $scope.eventos = eventosService.listar;

        
//    };

//}());

(function () {

    // controller
    var controlerName = 'ListarEventosController';


    // definição do controller
    var ListarEventosController = function ($scope, $location, $routeParams, EventosService) {

        $scope.titulo = "Eventos em Destaque";
        $scope.eventos = EventosService.listar;

        $scope.detalhar = function (evento) {
            $location.path("/eventos/detalhar/" + evento.id);
        };

    };

    // adiciono controller 
    angular.module('eventosApp')
        .controller(controlerName, ListarEventosController);

}());