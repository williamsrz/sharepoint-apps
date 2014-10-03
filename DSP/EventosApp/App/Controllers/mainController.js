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
                 'SharePointEventosService',
                  MainController
                ]);

    // definição do controller
    function MainController($scope, $log, $location, SharePointEventosService) {

        $scope.titulo = "Eventos em Destaque";
        $scope.eventos = [];

        $scope.detalhar = function (evento) {
            $location.path("/eventos/detalhar/" + evento.id);
        };

        SharePointEventosService.listar($scope);
       
        $log.info('Controller [' + controllerName + '] carregado!');
    };

}());