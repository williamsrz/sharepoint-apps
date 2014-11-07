(function () {

    /*
     * Promessa representa o resultado final de uma operação. 
     */


    'use strict';

    // serviço
    var serviceName = "eventoService"

    // configuração do serviço
    angular.module('eventosApp')
        .service(serviceName, [
                '$log',
                '$http',
                '$resource',
                '$q',
                'sharepointContextService',
                eventoService
        ]);


    // definição do serviço
    function eventoService(
        $log, $http, $resource, $q, sharepointContextService) {

        var srv = this;

        // recupero configurações de contexto 
        srv.hostWeb = sharepointContextService.hostWeb;

        //definição dos headers
        $http.defaults.headers.common.Accept = "application/json;odata=verbose";
        $http.defaults.headers.post['Content-Type'] = 'application/json;odata=verbose';
        $http.defaults.headers.post['X-Requested-With'] = 'XMLHttpRequest';
        $http.defaults.headers.post['If-Match'] = "*";

        // funções

        function selecionarEventos() {

            var dfd = $q.defer();

            $http.defaults.headers.post['X-HTTP-Method'] = "GET";

            var query = "?$select=ID,Title,Inicio,Local,Banner,Descricao&$orderby=Inicio desc";

            var restUrl = srv.hostWeb.appWebUrl +
                "/_api/web/lists/getByTitle('Eventos')/items" + query;

            $http.get(restUrl).success(function (data) {

                dfd.resolve(data.d.results);

            }).error(function (data) {
                dfd.reject("Erro ao recuperar eventos!");
            });

            return dfd.promise;
            //Promessa representa o resultado final de uma operação. 
        };

        function selecionarEvento(eventoId) {

            var dfd = $q.defer();

            $http.defaults.headers.post['X-HTTP-Method'] = "GET";

            var query = "?$select=ID,Title,Inicio,Local,Termino,Organizador,Local,Banner,Descricao,Detalhes";
            var restUrl = srv.hostWeb.appWebUrl + "/_api/web/lists/getByTitle('Eventos')/items(" + eventoId + ")" + query;

            $http.get(restUrl).success(function (data) {
                dfd.resolve(data.d);
            }).error(function (data) {
                dfd.reject("Erro ao recuperar detalhes do evento!");
            });

            return dfd.promise;
        };

        // assinatura do serviço
        return {
            listar: selecionarEventos,
            detalhar: selecionarEvento
        };
    };

}());