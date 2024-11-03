import request from '@/utils/request'

// 查询视频的转发信息列表
export function listForward(query) {
    return request({
        url: '/video/forward/list',
        method: 'get',
        params: query
    })
}

// 查询视频的转发信息详细
export function getForward(id) {
    return request({
        url: '/video/forward/' + id,
        method: 'get'
    })
}

// 新增视频的转发信息
export function addForward(data) {
    return request({
        url: '/video/forward',
        method: 'post',
        data: data
    })
}

// 修改视频的转发信息
export function updateForward(data) {
    return request({
        url: '/video/forward',
        method: 'put',
        data: data
    })
}

// 删除视频的转发信息
export function delForward(id) {
    return request({
        url: '/video/forward/' + id,
        method: 'delete'
    })
}
