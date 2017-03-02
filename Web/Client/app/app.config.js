(function() {
    'use strict';

    angular
        .module('app')
        .config(config);

    config.$inject = ['$stateProvider', '$urlRouterProvider', '$ocLazyLoadProvider'];

    function config($stateProvider, $urlRouterProvider, $ocLazyLoadProvider) {
        $ocLazyLoadProvider.config({
            debug: false,
            events: true
        });

        $urlRouterProvider.when('', '/new');
        $urlRouterProvider.otherwise('/new');

        var resolve_dep = function(config) {
            return {
                load: [
                    '$ocLazyLoad', function($ocLazyLoad) {
                        return $ocLazyLoad.load(config);
                    }
                ]
            };
        };

        $stateProvider
            .state('head', {
                abstract: true,
                controller: 'head_ctrl',
                templateUrl: 'client/app/layout/head.html',
                resolve: resolve_dep([
                    'client/css/head.css',
                    'client/app/layout/head_ctrl.js'
                ])
            })
            .state('head.menu', {
                abstract: true,
                controller: 'menu_ctrl',
                templateUrl: 'client/app/layout/menu.html',
                resolve: resolve_dep([
                    'client/css/menu.css',
                    'client/css/common/frame.css',
                    'client/app/layout/menu_ctrl.js'
                ])
            })
            .state('head.menu.new', {
                url: '/new',
                controller: 'new_ctrl',
                templateUrl: 'client/app/new/new.html',
                resolve: resolve_dep([
                    'client/css/new.css',
                    'client/app/new/new_ctrl.js',
                    'client/app/service/tree_svr.js',
                    'client/app/directive/ztree_direct.js',
                    'client/app/controller/datepicker_ctrl.js'
                ])
            })
            .state('head.menu.open', {
                url: '/open',
                controller: 'open_ctrl',
                templateUrl: 'client/app/open/open.html',
                resolve: resolve_dep([
                    'client/css/common/toolbar.css',
                    'client/css/common/tab.css',
                    'client/css/common/table.css',
                    'client/css/open.css',
                    'client/app/open/open_ctrl.js',
                    'client/app/service/tree_svr.js',
                    'client/app/directive/ztree_direct.js',
                    'client/app/controller/datepicker_ctrl.js',
                    'client/app/service/report_svr.js'
                ]),
                params: {   //参数必须先定义各参数，才能使用
                    rpt_code: undefined,
                    report_time: undefined,
                    start_time: undefined,
                    end_time: undefined
                }
            });
    }
})();