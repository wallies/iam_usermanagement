'use strict';

angular.module('user_management', [
    'ngCookies'
    ])

    .config(['$routeProvider', '$locationProvider', '$httpProvider', function ($routeProvider, $locationProvider, $httpProvider) {

    var access = routingConfig.accessLevels;

    $routeProvider

    .when('/',
        {
            templateUrl:    '/partials/account/home.html',
            controller:     'HomeCtrl',
            access:         access.user
        })
    .when('/login',
        {
            templateUrl:    '/partials/login.html',
            controller:     'LoginCtrl',
            access:         access.anon
        })
    .when('/register',
        {
            templateUrl:    '/partials/register.html',
            controller:     'RegisterCtrl',
            access:         access.anon
        })
    .when('/auth/twitter',
        {
            templateUrl:    '/partials/register.html',
            controller:     'RegisterCtrl',
            access:         access.anon
        })
    .when('/private',
        {
            templateUrl:    '/partials/account/private.html',
            controller:     'PrivateCtrl',
            access:         access.user
        })
    .when('/admin',
        {
            templateUrl:    '/partials/account/admin.html',
            controller:     'AdminCtrl',
            access:         access.admin
        })
    // .when('/account',
    //     {
    //         redirectTo : '/account/overview',
    //         access:         access.user
    //     })
    // .when('/account/', 
    //     {
    //         redirectTo : '/account/overview',
    //         access:         access.user
    //     })
    // .when('/account/recovery', 
    //     {
    //         templateUrl : '/partials/account/recovery.html',
    //         access:         access.user
    //     })
    // .when('/account/email', 
    //     {
    //         templateUrl : '/partials/account/email.html',
    //         access:         access.user
    //     })
    // .when('/account/overview', 
    //     { 
    //         templateUrl : '/partials/account/overview.html',
    //         access:         access.user
    //     })
    // .when('/account/connected', 
    //     { 
    //         templateUrl : '/partials/account/connected.html',
    //         access:         access.user
    //     })
    // .when('/account/password', 
    //     {
    //         templateUrl : '/partials/account/password.html',
    //         access:         access.user
    //     })
    // .when('/account/profile', 
    //     {
    //         templateUrl : '/partials/account/profile.html',
    //         access:         access.user
    //     })
    // .when('/account/signup', 
    //     {
    //         templateUrl : '/partials/account/profile.html',
    //         access:         access.user
    //     })
    
    // 404
    .when('/404',
        {
            templateUrl:    '/partials/404.html',
            access:         access.public
        })

    // Catch all
    .otherwise({redirectTo:'/404'});

    $locationProvider.html5Mode(true);

    var interceptor = ['$location', '$q', function($location, $q) {
        function success(response) {
            return response;
        }

        function error(response) {

            if(response.status === 401) {
                $location.path('/login');
                return $q.reject(response);
            }
            else {
                return $q.reject(response);
            }
        }

        return function(promise) {
            return promise.then(success, error);
        }
    }];

    $httpProvider.responseInterceptors.push(interceptor);

}])

    .run(['$rootScope', '$location', 'Auth', function ($rootScope, $location, Auth) {

        $rootScope.$on("$routeChangeStart", function (event, next, current) {
            $rootScope.error = null;
            if (!Auth.authorize(next.access)) {
                if(Auth.isLoggedIn()) $location.path('/');
                else                  $location.path('/login');
            }
        });

        $rootScope.appInitialized = true;
    }]);