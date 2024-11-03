import request from '@/utils/request'

// 查询视频的浏览信息列表
export function listBrowes(query) {
    return request({
        url: '/video/browes/list',
        method: 'get',
        params: query
    })
}

// 查询视频的浏览信息详细
export function getBrowes(id) {
    return request({
        url: '/video/browes/' + id,
        method: 'get'
    })
}

// 新增视频的浏览信息
export function addBrowes(data) {
    return request({
        url: '/video/browes',
        method: 'post',
        data: data
    })
}

// 修改视频的浏览信息
export function updateBrowes(data) {
    return request({
        url: '/video/browes',
        method: 'put',
        data: data
    })
}

// 删除视频的浏览信息
export function delBrowes(id) {
    return request({
        url: '/video/browes/' + id,
        method: 'delete'
    })
}
