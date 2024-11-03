import request from '@/utils/request'

// 查询视频的举报信息列表
export function listReport(query) {
    return request({
        url: '/video/report/list',
        method: 'get',
        params: query
    })
}

// 查询视频的举报信息详细
export function getReport(id) {
    return request({
        url: '/video/report/' + id,
        method: 'get'
    })
}

// 新增视频的举报信息
export function addReport(data) {
    return request({
        url: '/video/report',
        method: 'post',
        data: data
    })
}

// 修改视频的举报信息
export function updateReport(data) {
    return request({
        url: '/video/report',
        method: 'put',
        data: data
    })
}

// 删除视频的举报信息
export function delReport(id) {
    return request({
        url: '/video/report/' + id,
        method: 'delete'
    })
}
