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
                 'SharePointDataContextService',
                  MainController
                ]);

    // definição do controller
    function MainController($scope, $log, $location, SharePointDataContextService) {

        $scope.titulo = "Eventos em Destaque";
       

        $scope.detalhar = function (evento) {
            $location.path("/eventos/detalhar/" + evento.id);
        };

        //SharePointEventosService.listar($scope);
        $scope.eventos = [];
        SharePointDataContextService.listar().then(function (result) {
           
            angular.forEach(result, function (item) {

                var evento = {
                    id: item.ID,
                    titulo: item.Title,
                    inicio: $.getDate(item.Inicio, "DD/MM/YYYY"),
                    local: item.Local,
                    banner: item.Banner.Url,
                }

                $scope.eventos.push(evento);
            });
        });
       
        $log.info('Controller [' + controllerName + '] carregado!');
    };

}());