(function () {

    'use strict';

    // serviço
    var serviceName = "inscricaoService"

    // configuração do serviço
    angular.module('eventosApp')
        .service(serviceName, [
                '$log',
                '$http',
                '$resource',
                '$q',
                'sharepointContextService',
                inscricaoService
        ]);


    // definição do serviço
    function inscricaoService(
        $log, $http, $resource, $q, sharepointContextService) {

        var svc = this;

        // recupero configurações de contexto 
        svc.hostWeb = sharepointContextService.hostWeb;

        //definição dos headers
        $http.defaults.headers.common.Accept = "application/json;odata=verbose";
        $http.defaults.headers.post['Content-Type'] = 'application/json;odata=verbose';
        $http.defaults.headers.post['X-Requested-With'] = 'XMLHttpRequest';
        $http.defaults.headers.post['If-Match'] = "*";

        // funcoes

        function selecionarInscricao(usuarioId, eventoId) {

            var dfd = $q.defer();

            $http.defaults.headers.post['X-HTTP-Method'] = "GET";
            $http.defaults.headers.post['X-RequestDigest'] = sharepointContextService.securityValidation;

            var query = '?$filter=EventoId eq ' + eventoId + ' and AuthorId eq ' + usuarioId;
            var restUrl = svc.hostWeb.appWebUrl + "/_api/web/lists/getByTitle('Inscritos')/items" + query;

            $http.get(restUrl).success(function (data) {
                dfd.resolve(data.d.results);
            }).error(function (data) {
                dfd.reject("Erro ao obter status da inscrição no evento!");
            });

            return dfd.promise;
        };

        function adcionarInscricao(evento) {
            var dfd = $q.defer();

            $http.defaults.headers.post['X-HTTP-Method'] = "POST";
            $http.defaults.headers.post['X-RequestDigest'] = sharepointContextService.securityValidation;

            var query = "?$select=ID,Title,Inicio,Local,Termino,Organizador,Local,Banner,Descricao,Detalhes";
            var restUrl = svc.hostWeb.appWebUrl + "/_api/web/lists/getbytitle('Inscritos')/items" + query;

            $http.post(restUrl, {
                __metadata: {
                    type: "SP.Data." + "EventosInscritos" + "ListItem"
                },
                Title: evento.titulo,
                EventoId: evento.id
            }).success(function (data) {
                dfd.resolve(data.d);
            }).error(function (data) {
                dfd.reject("Erro ao efeutar inscrição!");
            });

            return dfd.promise;
        };

        function excluirInscricao(inscricao) {

            var dfd = $q.defer();

            $http.defaults.headers.post['X-HTTP-Method'] = "DELETE";
            $http.defaults.headers.post['X-RequestDigest'] = sharepointContextService.securityValidation;

            $log.info(inscricao.ID);

            var restUrl = svc.hostWeb.appWebUrl + "/_api/web/lists/getByTitle('Inscritos')/items(" + inscricao.ID + ")"

            $http.post(restUrl).success(function (data) {
                dfd.resolve(true);
            }).error(function (data) {
                dfd.reject("Erro ao cancelar inscrição!");
            });

            return dfd.promise;
        }

        // assinatura do serviço
        return {
            selecionar: selecionarInscricao,
            adicionar: adcionarInscricao,
            cancelar: excluirInscricao
        };
    };

}());
