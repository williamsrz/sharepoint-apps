(function () {
    'use strict';

    // controller
    var controllerName = 'SharePointAppChromeController';


    // configuração do controller 
    angular.module('eventosApp')
        .controller(controllerName,
                ['$scope',
                 '$log',
                 '$location',
                 'SharePointContextService',
                  SharePointAppChromeController
                ]);

    // definição do controller
    function SharePointAppChromeController($scope, $log, $location, SharePointContextService) {

        var sharepointChromeControlData = undefined;
        var hostWeb = SharePointContextService.hostWeb;

        // inicializar
        init();

        // construtor do controller
        function init() {

            // create chrome control settings
            // http://msdn.microsoft.com/en-us/library/office/fp179916(v=office.15).aspx

            sharepointChromeControlData = {
                siteUrl: hostWeb.url,
                siteTitle: hostWeb.title,
                appIconUrl: hostWeb.logoUrl,
                appTitle: 'Treinamentos, Cursos e Workshops',
                settingsLinks: [
                  {
                      linkUrl: "Lists/Eventos",
                      displayName: "[LISTA] Eventos"
                  },
                  {
                      linkUrl: "Lists/EventosInscritos",
                      displayName: "[LISTA] Inscrições"
                  }
                ]
            };

            // crio o controle sharepoint chrome 
            var nav = new SP.UI.Controls.Navigation("chrome_ctrl_container", sharepointChromeControlData);

            // deixo o controle visivel
            nav.setVisible(false);

            // oculto o topo (header) do sharepoint 
            nav.setBottomHeaderVisible(false);

        }

        $log.info('Controller [' + controllerName + '] carregado!');
    };

}());