(function () {

    // configuração do modulo para app
    var app = angular.module("eventosApp", [
        // dependencias
        'ngResource', 
        'ngRoute', // rotas
        'ngCookies' // cookies
    ]);


    // configuração de rotas
    app.config(function ($routeProvider) {
        $routeProvider
            .when("/main", {
                templateUrl: "App/Views/layout/main.html",
                controller: "MainController"
            })
            .when("/eventos", {
                templateUrl: "App/Views/eventos/listar.html",
                controller: "ListarEventosController"
            })
            .when("/eventos/detalhar/:id", {
                templateUrl: "App/Views/eventos/detalhar.html",
                controller: "DetalharEventosController"
            })
            .otherwise({ redirectTo: "/main" });
    });

}());