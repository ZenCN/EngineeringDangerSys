(function() {
    'use strict';

    angular
        .module('app.layout')
        .controller('head_ctrl', head_ctrl);

    head_ctrl.$inject = ['$scope', '$http', '$state'];

    function head_ctrl(vm, $http, $state) {

        /*if (!angular.isObject(vm.user)) {
            if ($.cookie('unitcode')) {
                vm.user = {
                    name: $.cookie('unitname'),
                    code: $.cookie('unitcode'),
                    level: $.cookie('level')
                };
            } else {
                $state.go('new');
            }
        }*/

        vm.user = {
            level: 2,
            name: '江西省',
            code: 36000000
        };

        vm.sing_out = function() {
            if (confirm('确定要注销吗？')) {
                $http.post('login/logout').then(function(response) {
                    if (response.data > 0) {
                        $state.go('login');
                    } else {
                        throw response.data;
                    }
                });
            }
        };
    }
})();