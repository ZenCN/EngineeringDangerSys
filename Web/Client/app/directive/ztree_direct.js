(function () {
    'use strict';

    angular
        .module('app.widget')
        .directive('zTree', zTree);

    zTree.$inject = ['svr'];

    function zTree(svr) {

        return {
            scope: {
                data: '=data',
                selected: '=selected',
                state: '=state',
                open_fn: '&open'
            },
            link: function (vm, $element) {

                function init_tree(simple_data) {
                    simple_data = $.isArray(simple_data) ? simple_data : vm.data;

                    return $.fn.zTree.init($element, {
                        data: {
                            simpleData: {enable: true}
                        },
                        callback: {
                            onClick: function () {
                                var node = arguments[2];
                                if (!node.isParent) {
                                    if (vm.state == 'open') {  //open state
                                        vm.open_fn({  //注：指令传递参数时，要先在模板中声明，再通过这种object方式传递
                                            end_time: node.value
                                        });
                                    } else {  //new state
                                        vm.selected = {
                                            rpt_code: node.id,
                                            rpt_name: node.name
                                        };

                                        if (node.id.contains('tb')) {
                                            vm.selected.write_time = new Date();
                                        } else {
                                            vm.selected.start_time = new Date();
                                            vm.selected.end_time = new Date().get_day(15);
                                        }
                                    }

                                    svr.apply(vm);
                                }
                            }
                        }
                    }, simple_data);
                }

                var tree_obj = init_tree();

                if (vm.state == 'new') {
                    var node = tree_obj.getNodeByParam("id", vm.selected.rpt_code, null);
                    if (node != null) {
                        tree_obj.selectNode(node);
                    }
                }

                vm.$on('reload_rpt_tree', function (event, simple_data) {
                    if ($.isArray(simple_data)) {
                        init_tree(simple_data);
                    } else {
                        $.fn.zTree.destroy('tree');
                    }
                });
            }
        };
    }
})();