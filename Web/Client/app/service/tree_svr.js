(function () {
    'use strict';

    angular.module('app.service')
        .factory('tree_svr', tree_svr);

    tree_svr.$inject = ['svr'];

    function tree_svr(svr) {

        return {
            get: {
                rpt_type: rpt_type,
                report: report
            }
        };

        function rpt_type(type) {
            var records = [
                {id: 'tb01', name: '水库（水电站、尾矿坝）险情表'},
                {id: 'tb02', name: '堤防（河道）险情表'},
                {id: 'tb03', name: '涵闸（泵站）险情表'},
                {id: 'tb04', name: '防汛抗旱突发灾情表'},
                {id: 'tb05', name: '供水危机情况表'}
            ];

            if (type == 'tree') {
                return [
                    {
                        name: '录入',
                        open: true,
                        children: records
                    }, {
                        name: '统计',
                        open: true,
                        children: [
                            {id: 'tj01', name: '水库出险情况统计表'},
                            {id: 'tj02', name: '圩堤出险情况统计表'},
                            {id: 'tj03', name: '圩堤出险情况累计统计表'}
                        ]
                    }
                ];
            } else {
                return records;
            }
        }

        function report(level) {
            var children = [
                //是父节点但是没有子节点数据时，要有iconSkin: 'ico_close '（注意：有个空格）才能显示关闭的文件夹图标
                {name: '1月', iconSkin: 'ico_close '},
                {name: '4月', iconSkin: 'ico_close '},
                {name: '5月', iconSkin: 'ico_close '},
                {name: '3月', iconSkin: 'ico_close '},
                {name: '2月', iconSkin: 'ico_close '},
                {name: '6月', iconSkin: 'ico_close '},
                {name: '7月', iconSkin: 'ico_close '},
                {name: '8月', iconSkin: 'ico_close '},
                {name: '9月', iconSkin: 'ico_close '},
                {name: '10月', iconSkin: 'ico_close '},
                {name: '11月', iconSkin: 'ico_close '},
                {
                    name: '12月', children: [  //父节点有数据时，不要指定iconSkin属性为'ico_close '
                    {id: 'tb01', name: '12月9日[xxx水库][已报送]'},
                    {id: 'tb01', name: '12月19日[xxx水库][未报送]'}
                ]
                }
            ], data = [
                {
                    name: '今年',
                    open: true,
                    children: children
                },
                {
                    name: '去年',
                    open: true,
                    children: children
                }
            ];

            switch (level) {
                case 2:
                    data[0].children.the_last().children = [{id: 'tb01', name: '12月19日[xxx市][xxx县][xxx水库]'}];
                    break;
                case 3:
                    data[0].children.the_last().children = [{id: 'tb01', name: '12月19日[xxx县][xxx水库]'}];
                    break;
            }

            return data;
        }
    }
})();