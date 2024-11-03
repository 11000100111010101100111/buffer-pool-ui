import request from '@/utils/request'

// 查询视频的评论信息列表
export function listComment(query) {
    return request({
        url: '/video/comment/list',
        method: 'get',
        params: query
    })
}

// 查询视频的评论信息详细
export function getComment(id) {
    return request({
        url: '/video/comment/' + id,
        method: 'get'
    })
}

// 新增视频的评论信息
export function addComment(data) {
    return request({
        url: '/video/comment',
        method: 'post',
        data: data
    })
}

// 修改视频的评论信息
export function updateComment(data) {
    return request({
        url: '/video/comment',
        method: 'put',
        data: data
    })
}

// 删除视频的评论信息
export function delComment(id) {
    return request({
        url: '/video/comment/' + id,
        method: 'delete'
    })
}
