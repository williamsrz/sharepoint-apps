(function () {

    // controller
    var controlerName = 'DetalharEventosController';


    // definição do controller
    var DetalharEventosController = function ($scope, $location, $routeParams, EventosService) {

       var eventoId = $routeParams.id;

        $scope.titulo = "Eventos em Destaque";

        $scope.evento = EventosService.listar[eventoId - 1];

        $scope.inscricao = function (evento) {
            var confirmado = confirm('Confirma sua inscrição no evento ' + evento.titulo + '?');

            if (confirmado) {
                $location.path("/eventos");
            }

        };

    };

    // adiciono controller 
    angular.module('eventosApp')
        .controller(controlerName, DetalharEventosController);

}());