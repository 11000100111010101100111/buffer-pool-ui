import request from '@/utils/request'

// 查询举报类型信息列表
export function listType(query) {
    return request({
        url: '/video/type/list',
        method: 'get',
        params: query
    })
}

// 查询举报类型信息详细
export function getType(id) {
    return request({
        url: '/video/type/' + id,
        method: 'get'
    })
}

// 新增举报类型信息
export function addType(data) {
    return request({
        url: '/video/type',
        method: 'post',
        data: data
    })
}

// 修改举报类型信息
export function updateType(data) {
    return request({
        url: '/video/type',
        method: 'put',
        data: data
    })
}

// 删除举报类型信息
export function delType(id) {
    return request({
        url: '/video/type/' + id,
        method: 'delete'
    })
}
