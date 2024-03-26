// mock.js  
import Mock from 'mockjs'

// 模拟登录接口  
Mock.mock('/api/login', 'post', {
    code: 200,
    message: '登录成功',
    data: {
        token: '@guid()' // 使用mockjs生成一个GUID作为token  
    }
})

// 你可以继续添加更多的模拟接口和数据...