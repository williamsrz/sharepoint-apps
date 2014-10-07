(function () {

    'use strict';

    // controller
    var controllerName = 'mainController';

    // configuração do controller 
    angular.module('eventosApp')
        .controller(controllerName,
                ['$scope',
                 '$log',
                 '$location',
                 'eventoService',
                  mainController
                ]);

    // definição do controller
    function mainController(
        $scope, $log, $location, eventoService) {

        // 
        $scope.titulo = "Eventos em Destaque";
        $scope.eventos = [];

        // inicializar o controller
        init();

        // construtor do controller
        function init() {
            eventoService.listar().then(function (result) {

                angular.forEach(result, function (item) {

                    var evento = {
                        id: item.ID,
                        titulo: item.Title,
                        inicio: $.getDate(item.Inicio, "DD/MM/YYYY"),
                        local: item.Local,
                        banner: item.Banner.Url,
                        descricao: item.Descricao
                    }

                    $scope.eventos.push(evento);
                });
            });
        }

        // eventos
        $scope.detalhar = function (evento) {
            $location.path("/eventos/detalhar/" + evento.id);
        };

        // log simples
        $log.info('Controller [' + controllerName + '] carregado!');
    };

}());