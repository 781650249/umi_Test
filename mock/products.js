import Mock from 'mockjs';
var result = Mock.mock({
    msg: '查询成功',
    status: 'success',
    "data|30": [{
        'id|+1': 1,
        title: '@name',
        'price|30-100': 30,
        'inventory|0-50': 0
    }]
})


console.log(result);

export default {
    'GET/api/products': {
        msg: '查询成功',
        status: 'success',
        data: result
    }
}