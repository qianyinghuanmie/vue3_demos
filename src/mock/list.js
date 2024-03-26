import Mock from 'mockjs';

// Mock.js 模拟数据
Mock.mock('/api/routes', 'get', {
    code: 200,
    message: '请求成功',
    'data|3-5': [{
        'path|+1': ['/', '/Login', '/Dash'],
        'name|+1': ['Home', 'Login', 'Dash'],
        'meta': {
            'name': '',
            'title': '',
            'icon|+1': ['1', '3', '4']
        },
        'children|0-2': [{
            'path': '@if(!("@path".includes("DashDetail"))) "/DashDetail/@integer(1, 100)" else ""',
            'name': '@if(!("@path".includes("DashDetail"))) "DashDetail" + @integer(1, 100) else ""',
            'meta': {
                'name': '',
                'title': '',
                'icon|+1': ['5', '6', '7']
            },
            'children': []
        }]
    }]
});
