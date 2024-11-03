import request from '@/utils/request'

// 查询视频的被收藏信息列表
export function listCollect(query) {
    return request({
        url: '/video/collect/list',
        method: 'get',
        params: query
    })
}

// 查询视频的被收藏信息详细
export function getCollect(id) {
    return request({
        url: '/video/collect/' + id,
        method: 'get'
    })
}

// 新增视频的被收藏信息
export function addCollect(data) {
    return request({
        url: '/video/collect',
        method: 'post',
        data: data
    })
}

// 修改视频的被收藏信息
export function updateCollect(data) {
    return request({
        url: '/video/collect',
        method: 'put',
        data: data
    })
}

// 删除视频的被收藏信息
export function delCollect(id) {
    return request({
        url: '/video/collect/' + id,
        method: 'delete'
    })
}
