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
                'sharepointContextService',
                usuarioService
        ]);


    // definição do serviço
    function usuarioService(
        $log, $http, $resource, $q, sharepointContextService) {

        var svc = this;
        svc.hostWeb = sharepointContextService.hostWeb;

        //definição dos headers
        $http.defaults.headers.common.Accept = "application/json;odata=verbose";
        $http.defaults.headers.post['Content-Type'] = 'application/json;odata=verbose';
        $http.defaults.headers.post['X-Requested-With'] = 'XMLHttpRequest';
        $http.defaults.headers.post['If-Match'] = "*";
        $http.defaults.headers.post['X-RequestDigest'] = sharepointContextService.securityValidation;


        function obterUsuarioCorrente() {

            var dfd = $q.defer();

            $http.defaults.headers.post['X-HTTP-Method'] = "GET";

            var restUrl = svc.hostWeb.appWebUrl + "/_api/web/currentUser";

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
