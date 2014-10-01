(function () {

    'use strict';

    // serviço
    var serviceName = "EventosService"

    // configuração do serviço
    angular.module('eventosApp')
        .service(serviceName, [
                '$http',
                EventosService
        ]);


    // definição do serviço
    function EventosService($http) {

        var listarEventos = [
                {
                    id: '1',
                    titulo: 'Alm Summit Brasil 2014',
                    inicio: '29/08/2014',
                    termino: '30/09/2014',
                    organizador: 'Lambda3',
                    local: 'Microsoft São Paulo'
                },
                {
                    id: '2',
                    titulo: 'TDC 2014',
                    inicio: '16/10/2014',
                    termino: '18/10/2014',
                    organizador: 'Global Code',
                    local: 'Porto Alegre'
                },
                {
                    id: '3',
                    titulo: 'Treinamento Java',
                    inicio: '23/11/2014',
                    termino: '10/12/2014',
                    organizador: 'Arquitetura',
                    local: 'Jundiai'
                }
        ];

        var detalharEvento = function (eventoId) {
            return "..";
        };

        return {
            listar: listarEventos,
            detalhar: detalharEvento
        };
    };

}());