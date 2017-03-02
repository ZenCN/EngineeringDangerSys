(function () {
    'use strict';

    angular.module('app.service')
        .factory('report_svr', report_svr);

    report_svr.$inject = ['svr'];

    function report_svr(svr) {

        return {
            query_name: query_name,
            reservoir: {
                save: function (json, callback) {
                    return svr.http('reservoir/save?json=' + json, callback);
                }
            }
        };

        function query_name(rpt_code) {
            switch (rpt_code) {
                case 'tb01':
                    return '水库';
                case 'tb02':
                    return '堤防';
                case 'tb03':
                    return '涵闸';
                case 'tb04':
                    return '突发';
                case 'tb05':
                    return '供水';
                case 'tj01':
                    return '水库统计';
                case 'tj02':
                    return '圩堤统计';
                case 'tj03':
                    return '圩堤累计';
                default:
                    return '未知';
            }
        }
    }
})();