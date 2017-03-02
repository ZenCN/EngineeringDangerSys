(function () {
    'use strict';

    angular
        .module('app.page')
        .controller('new_ctrl', new_ctrl);

    new_ctrl.$inject = ['$scope', 'tree_svr'];

    function new_ctrl($scope, tree_svr) {
        var vm = $scope.new;

        if ($.isEmptyObject(vm)) {  //not yet load
            vm.rpt_type = {
                tree_data: tree_svr.get.rpt_type('tree')
            };

            vm.rpt_type.selected = {
                rpt_code: vm.rpt_type.tree_data[0].children.the_first().id,
                rpt_name: vm.rpt_type.tree_data[0].children.the_first().name,
                report_time: new Date(),
                start_time: undefined,
                end_time: undefined
            };

            vm.create = function (is_statistic) {
                if (!$.isEmptyObject($scope.report)) {
                    var exist = false;
                    $scope.report.opened.seek(function (_this, i) {
                        if (_this.title.pageno == 0) {
                            exist = true;
                            return false;
                        }
                    });

                    if (exist) {
                        msg('只能同时新建一张表');
                        return;
                    }
                }

                var params = {
                    rpt_code: vm.rpt_type.selected.rpt_code
                };

                if (is_statistic) {
                    params.start_time = vm.rpt_type.selected.start_time;
                    params.end_time = vm.rpt_type.selected.end_time;
                } else {
                    params.report_time = vm.rpt_type.selected.report_time;
                }

                $scope.state.go('open', params);
            };
        }
    }
})();