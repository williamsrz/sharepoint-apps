(function () {

    'use strict';

    // serviço
    var serviceName = "SharePointDataContextService"

    // configuração do serviço
    angular.module('eventosApp')
        .service(serviceName, [
                '$log',
                '$http',
                '$resource',
                '$q',
                'SharePointContextService',
                SharePointDataContextService
        ]);


    // definição do serviço
    function SharePointDataContextService($log, $http, $resource, $q, SharePointContextService) {

        var dataContextService = this;
        dataContextService.hostWeb = SharePointContextService.hostWeb;

        //definição dos headers
        $http.defaults.headers.common.Accept = "application/json;odata=verbose";
        $http.defaults.headers.post['Content-Type'] = 'application/json;odata=verbose';
        $http.defaults.headers.post['X-Requested-With'] = 'XMLHttpRequest';
        $http.defaults.headers.post['If-Match'] = "*";

        function listarEventos() {
            var dfd = $q.defer();

            $http.defaults.headers.post['X-HTTP-Method'] = ""

            var query = "?$select=ID,Title,Inicio,Local,Banner&$orderby=Inicio desc";

            var restUrl = dataContextService.hostWeb.appWebUrl + "/_api/web/lists/getByTitle('Eventos')/items" + query;

            $http.get(restUrl).success(function (data) {

                dfd.resolve(data.d.results);

            }).error(function (data) {
                dfd.reject("Erro ao recuperar eventos!");
            });

            return dfd.promise;
        };

        function detalharEvento(eventoId) {
            var dfd = $q.defer();

            $http.defaults.headers.post['X-HTTP-Method'] = ""

            var query = "?$select=ID,Title,Inicio,Local,Termino,Organizador,Local,Banner,Descricao,Detalhes";
            var restUrl = dataContextService.hostWeb.appWebUrl + "/_api/web/lists/getByTitle('Eventos')/items(" + eventoId + ")" + query;

            $http.get(restUrl).success(function (data) {
                dfd.resolve(data.d);
            }).error(function (data) {
                dfd.reject("Erro ao recuperar detalhes do evento!");
            });

            return dfd.promise;
        };

        function inscreverEmEvento(evento) {
            var dfd = $q.defer();
            $http.defaults.headers.post['X-HTTP-Method'] = "";
            $http.defaults.headers.post['X-RequestDigest'] = SharePointContextService.securityValidation;

            var restUrl = dataContextService.hostWeb.appWebUrl + "/_api/web/lists/getbytitle('Inscritos')/items";
            $http.post(restUrl, {
                __metadata: {
                    type: "SP.Data." + "EventosInscritos" + "ListItem"
                },
                Title: evento.titulo,
                EventoId: evento.id //+ ";#" + evento.titulo
            }).success(function (data) {
                dfd.resolve(data.d);
            }).error(function (data) {
                dfd.reject("Erro ao efeutar inscrição!");
            });
            return dfd.promise;
        };

        // assinatura do serviço
        return {
            listar: listarEventos,
            detalhar: detalharEvento,
            increver: inscreverEmEvento
        };

    };

}());