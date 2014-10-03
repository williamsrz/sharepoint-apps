(function () {

    /*
        A ideia aqui é pegar os parametros enviados por querystring,  
        gravar como cookie para termos uma url limpa para app
    */

    'use strict';

    // serviço
    var serviceName = "SharePointContextService"

    // configuração do serviço
    angular.module('eventosApp')
        .service(serviceName, [
                '$log',
                '$cookieStore',
                '$window',
                '$location',
                '$resource',
                '$timeout',
                 SharePointContextService]);


    // definição do serviço
    function SharePointContextService($log, $cookieStore, $window, $location, $resource, $timeout) {

        var servico = this;

        var spWeb = {
            appWebUrl: '',
            url: '',
            title: '',
            logoUrl: ''
        };

        servico.hostWeb = spWeb;


        // if valores não existem na querystring
        if (decodeURIComponent($.getQueryStringValue("SPHostUrl")) === "undefined") {

            // carrego as informações do cookie 
            obterSharePointAppContextCookie();

            // atualização automatica do sharepoint security validation digest
            atualizarSharePointSecurityValidationDigest();

        } else {
            // salvo as informações no cookie
            criarSharePointAppContext();
        }

        $log.info('Serviço [' + serviceName + '] carregado!');

        // recupero as informações gravadas no cookie
        function obterSharePointAppContextCookie() {

            servico.hostWeb.appWebUrl = $cookieStore.get('SPAppWebUrl');
            servico.hostWeb.url = $cookieStore.get('SPHostUrl');
            servico.hostWeb.title = $cookieStore.get('SPHostTitle');
            servico.hostWeb.logoUrl = $cookieStore.get('SPHostLogoUrl');
        }

        // atualização automatica do sharepoint security validation digest
        function atualizarSharePointSecurityValidationDigest() {

            var siteContextInfoResource = $resource('_api/contextinfo?$select=FormDigestValue', {}, {
                post: {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json;odata=verbose',
                        'Content-Type': 'application/json;odata=verbose'
                    }
                }
            });

            // request 
            siteContextInfoResource.post({}, function (data) {

                // recupero o security digest timeout e value & guardo no serviço
                var validacaoRefreshTimeout = data.d.GetContextWebInformation.FormDigestTimeoutSeconds - 5;
                servico.securityValidation = data.d.GetContextWebInformation.FormDigestValue;

                // repeat this in FormDigestTimeoutSeconds-5
                $timeout(function () {

                    $log.error('Atualizando FormDigestValue');

                    atualizarSharePointSecurityValidationDigest();

                }, validacaoRefreshTimeout * 100);

            }, function (error) {
                $log.error(error);
            });

        }

        // crio o contexto para app, salvando as informações que são enviadas via querystring para o cookie
        // aqui utilizo a função getQueryStringValue jquery.helpers
        function criarSharePointAppContext() {

            var appWebUrl = decodeURIComponent($.getQueryStringValue("SPAppWebUrl"));
            $cookieStore.put('SPAppWebUrl', appWebUrl);

            var url = decodeURIComponent($.getQueryStringValue("SPHostUrl"));
            $cookieStore.put('SPHostUrl', url);

            var title = decodeURIComponent($.getQueryStringValue("SPHostTitle"));
            $cookieStore.put('SPHostTitle', title);

            var logoUrl = decodeURIComponent($.getQueryStringValue("SPHostLogoUrl"));
            $cookieStore.put('SPHostLogoUrl', logoUrl);

            // redireciono para a app
            $window.location.href = appWebUrl + '/app.html';
        }
    };

}());