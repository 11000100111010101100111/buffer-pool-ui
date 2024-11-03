import request from '@/utils/request'

export function getVideo(index, count) {
  return request({
    url: '/video/open-api/mock-video-info?index='+index+'&count='+count,
    method: 'get'
  })
}
