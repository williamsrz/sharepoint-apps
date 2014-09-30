(function () {

    'use strict';

    // Controller
    var controlerName = 'mainController';

    angular
        .module('eventosApp')
        .controller(controlerName, ['$scope', mainController]);

    function mainController($scope) {
        $scope.titulo = "Eventos em Destaque";
    };

}());