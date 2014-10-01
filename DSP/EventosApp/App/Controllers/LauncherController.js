(function () {
    'use strict';

    // controller
    var controllerName = 'LauncherController';


    // configuração do controller 
    angular.module('eventosApp')
        .controller(controllerName, [
            'SharePointContextService',
             LauncherController
        ]);

    // definição do controller
    function LauncherController(SharePointContextService) {

    }

}());