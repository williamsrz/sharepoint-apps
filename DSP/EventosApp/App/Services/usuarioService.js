(function () {

    'use strict';

    // serviço
    var serviceName = "usuarioService"

    // configuração do serviço
    angular.module('eventosApp')
        .service(serviceName, [
                '$log',
                '$http',
                '$resource',
                '$q',
                'SharePointContextService',
                usuarioService
        ]);


    // definição do serviço
    function usuarioService($log, $http, $resource, $q, SharePointContextService) {

        var dataContextService = this;
        dataContextService.hostWeb = SharePointContextService.hostWeb;

        //definição dos headers
        $http.defaults.headers.common.Accept = "application/json;odata=verbose";
        $http.defaults.headers.post['Content-Type'] = 'application/json;odata=verbose';
        $http.defaults.headers.post['X-Requested-With'] = 'XMLHttpRequest';
        $http.defaults.headers.post['If-Match'] = "*";

        function obterUsuarioCorrente() {

            var dfd = $q.defer();

            $http.defaults.headers.post['X-HTTP-Method'] = "";
            $http.defaults.headers.post['X-RequestDigest'] = SharePointContextService.securityValidation;

            var restUrl = dataContextService.hostWeb.appWebUrl + "/_api/web/currentUser";

            $http.get(restUrl, {
            }).success(function (data) {
                dfd.resolve(data.d);
            }).error(function (data) {
                dfd.reject("Erro ao obter usuário!");
            });

            return dfd.promise;
        };

        return {
            usuarioCorrente: obterUsuarioCorrente
        };
    };

}());

//var query = '?$filter=AuthorId eq ' + user.Id;
//getListItems(url, listname, query, complete, failure);