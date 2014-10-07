(function () {
    'use strict';

    // nome controller
    var controllerName = 'DetalharEventosController';

    // configuração do controller 
    angular.module('eventosApp')
        .controller(controllerName,
                ['$scope',
                 '$log',
                 '$filter',
                 '$location',
                 '$routeParams',
                 'SharePointDataContextService',
                 'usuarioService',
                 'inscricaoService',
                  DetalharEventosController
                ]);

    // definição do controller
    function DetalharEventosController($scope, $log, $filter, $location, $routeParams, SharePointDataContextService, usuarioService, inscricaoService) {

        var controller = this;

        var eventoId = $routeParams.id;
        $scope.titulo = "Eventos em Destaque";
        $scope.evento = null;
        $scope.inscricao = null;
        $scope.inscrito = false;

        inicializar();

        function inicializar() {
            usuarioService.usuarioCorrente()
            .then(obterUsuario, erro)
            .then(obterEvento, erro)
            .then(obterStatusInscricao, erro);

        }

        $scope.efetuarInscricao = function (evento) {

            //se usuário inscrito, cancela 
            if ($scope.inscrito) {

                var mensagem = "Você tem certeza que quer desistir do evento " + evento.titulo + "!";

                confirmar("Que pena!", mensagem, "Não, espera!", "Sim, é isso mesmo!", function () {
                    inscricaoService.cancelar($scope.inscricao)
                    .then(cancelarInscricao, erro)
                    .then(inicializar, erro);
                });
            }
            else {
                inscricaoService.adicionar(evento)
                    .then(realizarInscricao, erro)
                    .then(inicializar, erro);
            }
        };


        //Inscrição

        function cancelarInscricao() {
            sucesso("Feito!", "Sua inscrição foi cancelada!");
        }

        function realizarInscricao(resultado) {
            var texto = "A sua inscrição no evento " + resultado.Title + " foi realizada com sucesso!";
            sucesso("Parabéns!", texto);
        }

        function obterStatusInscricao() {

            var usuarioId = $scope.usuario.Id;
            $scope.inscrito = false;

            inscricaoService.inscricaoEventoUsuario(usuarioId, eventoId)
                .then(function (result) {

                    $scope.inscricao = (result.length > 0) ? result[0] : null;
                    $scope.inscrito = (result.length > 0);

                }, erro);
        }

        //Usuario

        function obterUsuario(result) {
            $scope.usuario = result;
        }

        //Evento

        function obterEvento() {

            SharePointDataContextService.detalhar(eventoId)
                .then(function (result) {

                    var item = result;

                    $scope.evento = {
                        id: item.ID,
                        titulo: item.Title,
                        inicio: $.getDate(item.Inicio, "DD/MM/YYYY"),
                        termino: $.getDate(item.Termino, "DD/MM/YYYY"),
                        organizador: item.Organizador,
                        local: item.Local,
                        banner: item.Banner.Url,
                        descricao: item.Descricao,
                        detalhes: item.Detalhes
                    };

                }, erro);
        }




        //Mensagens

        function confirmar(titulo, mensagem, textoCancela, textoConfirma, funcao) {

            swal({
                title: titulo,
                text: mensagem,
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: textoConfirma,
                cancelButtonText: textoCancela
            }, funcao);

        }

        function sucesso(titulo, mensagem) {
            swal({
                title: titulo,
                text: mensagem,
                type: "success",
                confirmButtonText: "Legal!"
            });
        };

        function erro(mensagem) {
            swal({
                title: "OPS!",
                text: mensagem,
                type: "error",
                confirmButtonText: "Que pena!"
            });
        }

        $log.info('Controller [' + controllerName + '] carregado!');
    };

}());