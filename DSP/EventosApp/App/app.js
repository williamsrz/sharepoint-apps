(function () {

    var app = angular.module("eventosApp", ["ngRoute"]);

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