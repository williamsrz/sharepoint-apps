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
                    local: 'Microsoft São Paulo',
                    banner: 'Images/eventos/almsummit2014.png',
                    descricao: 'Realizado anualmente desde 2011, o ALM Summit Brasil é o principal evento do país.'
                },
                {
                    id: '2',
                    titulo: 'TDC 2014',
                    inicio: '16/10/2014',
                    termino: '18/10/2014',
                    organizador: 'Global Code',
                    local: 'Porto Alegre',
                    banner: 'Images/eventos/tdc.png',
                    descricao: 'Realizado anualmente desde 2011, o ALM Summit Brasil é o principal evento do país.'
                },
                {
                    id: '3',
                    titulo: 'Treinamento Java',
                    inicio: '23/11/2014',
                    termino: '10/12/2014',
                    organizador: 'Arquitetura',
                    local: 'Jundiai',
                    banner: 'Images/eventos/treinamento-java.png',
                    descricao: 'Realizado anualmente desde 2011, o ALM Summit Brasil é o principal evento do país.'
                }
                ,
                {
                    id: '4',
                    titulo: 'Workshop SharePoint ALM',
                    inicio: '11/12/2014',
                    termino: '12/12/2014',
                    organizador: '#DescubraSharePoint',
                    local: 'Curitiba',
                    banner: 'Images/eventos/sharepointalm.png',
                    descricao: 'Realizado anualmente desde 2011, o ALM Summit Brasil é o principal evento do país.'
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