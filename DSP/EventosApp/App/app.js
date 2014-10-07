(function () {

    // configuração do modulo para app
    var app = angular.module("eventosApp", [
        // dependencias
        'ngResource',
        'ngRoute', // rotas
        'ngCookies', // cookies
        'ngSanitize',
        'ngAnimate'
    ]);


    // configuração de rotas
    app.config(function ($routeProvider) {
        $routeProvider
            .when("/main", {
                templateUrl: "App/Views/layout/main.html",
                controller: "mainController"
            })
            .when("/eventos/detalhar/:id", {
                templateUrl: "App/Views/eventos/detalhar.html",
                controller: "detalharEventoController"
            })
            .when("/eventos/incluir", {
                templateUrl: "App/Views/eventos/incluir.html",
                controller: "eventosController"
            })
            .otherwise({ redirectTo: "/main" });
    });


}());