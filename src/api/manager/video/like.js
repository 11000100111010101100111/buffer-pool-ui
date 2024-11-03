import request from '@/utils/request'

// 查询视频的点赞信息列表
export function listLike(query) {
    return request({
        url: '/video/like/list',
        method: 'get',
        params: query
    })
}

// 查询视频的点赞信息详细
export function getLike(id) {
    return request({
        url: '/video/like/' + id,
        method: 'get'
    })
}

// 新增视频的点赞信息
export function addLike(data) {
    return request({
        url: '/video/like',
        method: 'post',
        data: data
    })
}

// 修改视频的点赞信息
export function updateLike(data) {
    return request({
        url: '/video/like',
        method: 'put',
        data: data
    })
}

// 删除视频的点赞信息
export function delLike(id) {
    return request({
        url: '/video/like/' + id,
        method: 'delete'
    })
}
