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
                 'SharePointDataContextService',
                  DetalharEventosController
                ]);

    // definição do controller
    function DetalharEventosController($scope, $log, $location, $routeParams, SharePointDataContextService) {

        var eventoId = $routeParams.id;

        $scope.titulo = "Eventos em Destaque";

        $scope.evento = null;
        SharePointDataContextService.detalhar(eventoId).then(function (result) {

            var item = result;

            $scope.evento = {
                id: item.ID,
                titulo: item.Title,
                inicio: item.Inicio,
                termino: item.Termino,
                organizador: item.Organizador,
                local: item.Local,
                banner: item.Banner.Url,
                descricao: item.Descricao,
                detalhes: item.Detalhes
            };

        });

        $scope.inscricao = function (evento) {
            SharePointDataContextService.increver(evento).then(efetuarInscricao, erro);
        };

        function efetuarInscricao(data) {
            //$log.info(data.ID);
            var texto = "A sua inscrição no evento " + data.Title + " foi realizada com sucesso!"
            swal({ title: "Parabéns", text: texto, type: "success", confirmButtonText: "Legal" });
        };

        function erro(reason) {
            swal({ title: "OPS!", text: reason, type: "error", confirmButtonText: "Que pena!" });
        }
        
        $log.info('Controller [' + controllerName + '] carregado!');
    };

}());