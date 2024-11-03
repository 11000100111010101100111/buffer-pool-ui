import request from '@/utils/request'

// 查询视频的举报信息列表
export function listReports(query) {
    return request({
        url: '/video/reports/list',
        method: 'get',
        params: query
    })
}

// 查询视频的举报信息详细
export function getReports(id) {
    return request({
        url: '/video/reports/' + id,
        method: 'get'
    })
}

// 新增视频的举报信息
export function addReports(data) {
    return request({
        url: '/video/reports',
        method: 'post',
        data: data
    })
}

// 修改视频的举报信息
export function updateReports(data) {
    return request({
        url: '/video/reports',
        method: 'put',
        data: data
    })
}

// 删除视频的举报信息
export function delReports(id) {
    return request({
        url: '/video/reports/' + id,
        method: 'delete'
    })
}
