(function () {

    'use strict';

    // controller
    var controllerName = 'launcherController';

    // configuração do controller 
    angular.module('eventosApp')
        .controller(controllerName, [
            '$log',
            'sharepointContextService',
             launcherController
        ]);

    // definição do controller

    function launcherController($log, sharepointContextService) {

        // inicializar
        init();

        // construtor do controller
        function init() { };

        // log simples
        $log.info('Controller [' + controllerName + '] carregado!');
    }

}());