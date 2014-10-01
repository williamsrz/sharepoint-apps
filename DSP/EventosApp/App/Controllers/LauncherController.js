(function () {
    'use strict';

    // controller
    var controllerName = 'LauncherController';


    // configuração do controller 
    angular.module('eventosApp')
        .controller(controllerName, [
            '$log',
            'SharePointContextService',
             LauncherController
        ]);

    // definição do controller
    function LauncherController($log, SharePointContextService) {

        $log.info('Controller [' + controllerName + '] carregado!');
    }

}());