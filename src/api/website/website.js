import request from '@/utils/request'

export function loveOnce() {
  return request({
    url: '/website/open-api/love-me',
    method: 'post',
  })
}

export function hasLovedMe() {
  return request({
    url: '/website/open-api/has-loved-me',
    method: 'get',
  })
}

export function lovedCount() {
  return request({
    url: '/website/open-api/loved-count',
    method: 'get',
  })
}
