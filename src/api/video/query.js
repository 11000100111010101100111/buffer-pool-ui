import request from '@/utils/request'

export function getVideoByRecommended(filterIdsStr, count) {
  return request({
    url: '/video/open-api/bowers/videos?filterIds='+filterIdsStr+'&count='+count,
    method: 'get'
  })
}
