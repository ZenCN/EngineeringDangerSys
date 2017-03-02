(function() {
    'use strict';

    angular
        .module('app.page')
        .controller('open_ctrl', open_ctrl);

    open_ctrl.$inject = ['$scope', '$stateParams', 'tree_svr', 'report_svr'];

    function open_ctrl($scope, $stateParams, tree_svr, report_svr) {
        var vm = $scope.report;

        if ($.isEmptyObject(vm)) {
            vm.filter = {
                rpt_type: {
                    data: tree_svr.get.rpt_type()
                },
                under_unit: {
                    data: [],
                    selected_code: ''
                }
            };
            vm.filter.rpt_type.selected_code = vm.filter.rpt_type.data.the_first().id; //tb01

            vm.opened = [];
            vm.current = undefined;

            vm.tree = {
                data: {
                    tb01: tree_svr.get.report($scope.user.level)
                },
                refresh: function() {
                    if (!$.isArray(this.data[vm.filter.rpt_type.selected_code])) {
                        //$ajax load tree data
                    }
                    $scope.$broadcast('reload_rpt_tree', this.data[vm.filter.rpt_type.selected_code]);
                }
            };

            vm.send = function() {

            };

            vm.save = function() {
                report_svr.reservoir.save(angular.toJson(vm.current), function(response) {
                    if (response.data > 0) {
                        vm.current.pageno = Number(response.data);
                        msg('保存成功！');
                    }
                });
            };

            vm.delete = function() {

            };

            vm.close = function() {
                if (confirm('确定要关闭吗？')) {
                    vm.opened.seek(function(rpt, i, list) {
                        if (rpt.title.pageno == 0) {
                            list.splice(i, 1);
                            return false;
                        }
                    });

                    vm.current = vm.opened.the_first();
                }
            };

            vm.open = function(rpt_code, time) {

            };

            vm.export = {
                to_excel: function() {

                }
            };

            vm.exist = angular.isObject;
        }

        if ($stateParams.rpt_code) {
            if ($stateParams.rpt_code.contains('tb')) { //new record report
                vm.current = {
                    report_time: $stateParams.report_time,
                    reporter: undefined,
                    name: '[' + report_svr.query_name($stateParams.rpt_code) + ']' + $stateParams.report_time.to_str()
                };

                $scope.$watch('report.current.report_time', function(choose_date) {
                    if (angular.isDate(choose_date)) {
                        vm.current.name = '[' + report_svr.query_name(vm.current.rpt_code) + ']' + choose_date.to_str();
                    }
                });
            } else {
                vm.current = {
                    report_time: $stateParams.start_time.to_str(),
                    reporter: $stateParams.end_time.to_str(),
                    name: '[' + report_svr.query_name($stateParams.rpt_code) + ']' +
                        $stateParams.start_time.to_str() + '~' + $stateParams.end_time.to_str('MM月dd日')
                };
            }

            vm.current.rpt_code = $stateParams.rpt_code;
            vm.current.pageno = 0;
            vm.current.is_record = $stateParams.rpt_code.contains('tb');
            vm.current.template = 'client/template/' + $stateParams.rpt_code + '.html';

            vm.opened.push(vm.current);
        }
    }
})();