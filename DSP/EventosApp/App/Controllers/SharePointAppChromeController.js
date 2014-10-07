(function () {
    'use strict';

    // controller
    var controllerName = 'sharepointAppChromeController';

    // configuração do controller 
    angular.module('eventosApp')
        .controller(controllerName,
                ['$scope',
                 '$log',
                 '$location',
                 'sharepointContextService',
                  sharepointAppChromeController
                ]);

    // definição do controller
    function sharepointAppChromeController(
        $scope, $log, $location, sharepointContextService) {

        var sharepointChromeControlData = undefined;

        var hostWeb = sharepointContextService.hostWeb;

        // inicializar o controller
        init();

        // construtor do controller
        function init() {

            // MSDN como criar configurações e o sharepoint chrome control
            // http://msdn.microsoft.com/en-us/library/office/fp179916(v=office.15).aspx

            sharepointChromeControlData = {
                siteUrl: hostWeb.url,
                siteTitle: hostWeb.title,
                //appTitle: 'Treinamentos, Cursos e Workshops',
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
            nav.setVisible(true);

            // oculto o topo (header) do sharepoint 
            nav.setBottomHeaderVisible(false);

        }

        // log simples
        $log.info('Controller [' + controllerName + '] carregado!');
    };

}());