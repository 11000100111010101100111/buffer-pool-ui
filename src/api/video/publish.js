import {request, requestV1} from '@/utils/request'

export async function publishVideos(videos, body, onUploadProgress) {
  console.log(body)
  const formData = new FormData();
  if (videos) {
    for (let i = 0; i < videos.length; i++) {
      formData.append('videos', videos[i]);
    }
  }
  formData.append('data', JSON.stringify(body));
  return await requestV1({
    url: '/video/open-api/publish',
    method: 'post',
    contentType: false,
    data: formData
  }, onUploadProgress)
}
