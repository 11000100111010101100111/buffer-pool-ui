import request from '@/utils/request'

// 查询视频原始信息列表
export function listMetadata(query) {
    return request({
        url: '/video/metadata/list',
        method: 'get',
        params: query
    })
}

// 查询视频原始信息详细
export function getMetadata(id) {
    return request({
        url: '/video/metadata/' + id,
        method: 'get'
    })
}

// 新增视频原始信息
export function addMetadata(data) {
    return request({
        url: '/video/metadata',
        method: 'post',
        data: data
    })
}

// 修改视频原始信息
export function updateMetadata(data) {
    return request({
        url: '/video/metadata',
        method: 'put',
        data: data
    })
}

// 删除视频原始信息
export function delMetadata(id) {
    return request({
        url: '/video/metadata/' + id,
        method: 'delete'
    })
}
