import request from '@/utils/request'

// 查询视频产生的相关数据列表
export function listData(query) {
    return request({
        url: '/video/data/list',
        method: 'get',
        params: query
    })
}

// 查询视频产生的相关数据详细
export function getData(id) {
    return request({
        url: '/video/data/' + id,
        method: 'get'
    })
}

// 新增视频产生的相关数据
export function addData(data) {
    return request({
        url: '/video/data',
        method: 'post',
        data: data
    })
}

// 修改视频产生的相关数据
export function updateData(data) {
    return request({
        url: '/video/data',
        method: 'put',
        data: data
    })
}

// 删除视频产生的相关数据
export function delData(id) {
    return request({
        url: '/video/data/' + id,
        method: 'delete'
    })
}
