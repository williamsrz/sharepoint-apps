(function () {

    'use strict';

    // serviço
    var serviceName = "EventosService"
    angular
        .module('eventosApp')
        .factory(serviceName, EventosService);

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