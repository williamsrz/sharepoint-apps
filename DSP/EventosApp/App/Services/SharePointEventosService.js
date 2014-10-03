(function () {

    'use strict';


    //lista eventos
    var listName = 'Eventos'

    // serviço
    var serviceName = "SharePointEventosService"

    // configuração do serviço
    angular.module('eventosApp')
        .service(serviceName, [
                '$log',
                '$http',
                '$resource',
                '$q',
                'SharePointContextService',
                SharePointEventosService
        ]);


    // definição do serviço
    function SharePointEventosService($log, $http, $resource, $q, SharePointContextService) {

        var servico = this;
        var hostWeb = SharePointContextService.hostWeb;


        $log.info('Serviço [' + serviceName + '] carregado!');


        // recupero todos os eventos
        function listarEventos($scope) {

            var deferred = $q.defer();

            var hostweburl = hostWeb.url;
            var appweburl = hostWeb.appWebUrl;

            $http({
                method: 'GET',
                url: appweburl + "/_api/web/lists/getByTitle('Eventos')/items?$select=ID,Title,Inicio,Local,Banner", //Termino,Organizador,Local,Banner,Descricao,Detalhes
                headers: { "Accept": "application/json;odata=verbose" }
            })
                .success(function (data, status, headers, config) {

                    $.each(data.d.results, function (index, item) {

                        $log.info(index + ": " + item.Title);

                        $scope.eventos.push({

                            id: item.ID,
                            titulo: item.Title,
                            inicio: item.Inicio,
                            local: item.Local,
                            banner: item.Banner.Url,
                        });

                    });


                    //$scope.$apply();


                }).error(function (data, status, headers, config) {
                    alert(status);
                });


            return deferred.promise;
        };


        function detalharEvento($scope, id) {

            var deferred = $q.defer();

            var hostweburl = hostWeb.url;
            var appweburl = hostWeb.appWebUrl;

            $http({
                method: 'GET',
                url: appweburl + "/_api/web/lists/getByTitle('Eventos')/items(" + id + ")?$select=ID,Title,Inicio,Local,Termino,Organizador,Local,Banner,Descricao,Detalhes",
                headers: { "Accept": "application/json;odata=verbose" }
            })
                .success(function (data, status, headers, config) {

                    var item = data.d;

                    $log.info(data.d);

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

                }).error(function (data, status, headers, config) {
                    alert(status);
                });


            return deferred.promise;
        };

        // assinatura do serviço
        return {
            listar: listarEventos,
            detalhar: detalharEvento
        };

    };

}());