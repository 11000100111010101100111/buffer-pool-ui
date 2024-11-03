import request from '@/utils/request'

// 查询视频相关的话题（标签）信息列表
export function listTag(query) {
    return request({
        url: '/video/tag-v1/list',
        method: 'get',
        params: query
    })
}

// 查询视频相关的话题（标签）信息详细
export function getTag(id) {
    return request({
        url: '/video/tag-v1/' + id,
        method: 'get'
    })
}

// 新增视频相关的话题（标签）信息
export function addTag(data) {
    return request({
        url: '/video/tag-v1',
        method: 'post',
        data: data
    })
}

// 修改视频相关的话题（标签）信息
export function updateTag(data) {
    return request({
        url: '/video/tag-v1',
        method: 'put',
        data: data
    })
}

// 删除视频相关的话题（标签）信息
export function delTag(id) {
    return request({
        url: '/video/tag-v1/' + id,
        method: 'delete'
    })
}
