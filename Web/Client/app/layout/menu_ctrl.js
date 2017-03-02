(function () {
    'use strict';

    angular
        .module('app.layout')
        .controller('menu_ctrl', menu_ctrl);

    menu_ctrl.$inject = ['$scope', '$state'];

    function menu_ctrl(vm, $state) {

        vm.state = {
            current: window.location.hash.replace('#/', ''),
            go: function (state, params) {
                if (state != vm.state.current) {
                    $state.go('head.menu.' + state, params);
                    vm.state.current = state;
                }
            }
        };

        vm.new = {};  //namespace for new page

        vm.report = {};  //namespace for open page

        //window.$scope = $scope;  //just for debug
    }
})();