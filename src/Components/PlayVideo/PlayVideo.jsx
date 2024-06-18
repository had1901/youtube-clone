import React, { useEffect, useState } from 'react'
import './PlayVideo.css'

import video1 from '../../assets/images/video.mp4'
import like from '../../assets/images/like.png'
import dislike from '../../assets/images/dislike.png'
import share from '../../assets/images/share.png'
import save from '../../assets/images/save.png'
import jack from '../../assets/images/jack.png'
import userProfile from '../../assets/images/user_profile.jpg'
import { api, handleValueConvert } from '../../data'
import moment from 'moment'

const PlayVideo = ({videoId}) => {
  const [apiData, setApiData] = useState(null)
  const [channelData, setChannelData] = useState(null)
  const [commentData, setCommentData] = useState([])

  const fetchVideoData = async () => {
    const videoDetailsURL = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}&key=${api}`
    await fetch(videoDetailsURL)
            .then(responsive => responsive.json())
            .then(data => setApiData(data.items[0]))
            .catch(error => console.error(error, "Loading video failed"))
  }

  const fetchChannelData = async () => {
    const channelURL = `https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${apiData?.snippet?.channelId}&key=${api}`
    await fetch(channelURL)
            .then(responsive => responsive.json())
            .then(data => setChannelData(data?.items[0]))
            .catch(error => console.error(error, "Loading channel failed"))
  }

  const fetchCommentData = async () => {
    const commentURL = `https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet%2Creplies&videoId=${videoId}&key=${api}`
    await fetch(commentURL)
            .then(response => response.json())
            .then(data => setCommentData(data?.items))
            .catch(error => console.error(error, "Loading comment failed"))
  }
  
  useEffect(() => {
    videoId && fetchVideoData()
  },[])

  useEffect(() => {
    apiData && fetchChannelData()
  },[apiData])

  useEffect(() => {
    apiData && fetchCommentData()
  },[apiData])

  return (
    <div className='play-video'>
      {/* <video src={video1} controls autoPlay muted></video> */}
      <iframe src={`https://www.youtube.com/embed/${videoId}?autoplay=1`} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
      <h3>{apiData ? apiData?.snippet.title : ''}</h3>
      <div className='play-video-info'>
        <p>{apiData ? handleValueConvert(apiData.statistics.viewCount) + ' lượt xem' : '100 M'} &bull; {apiData ? moment(apiData.snippet.publishedAt).fromNow() : ''}</p>
        <div>
          <span><img src={like} alt='' />{apiData ? handleValueConvert(apiData.statistics.likeCount) : '150'}</span>
          <span><img src={dislike} alt='' /></span>
          <span><img src={share} alt='' /></span>
          <span><img src={save} alt='' /></span>
        </div>
      </div>
      <hr/>
      <div className='publisher'>
        <img src={channelData ? channelData.snippet.thumbnails.default.url : ''} alt='' />
        <div>
          <p>{apiData ? apiData.snippet.channelTitle : ''}</p>
          <span>{channelData ? handleValueConvert(channelData.statistics.subscriberCount) + ' người đăng ký': ''}</span>
        </div>
        <button>Subscribe</button>
      </div>
      <div className='video-description'>
        <p>{apiData ? apiData.snippet.description : ''}</p>
        <p>Đăng ký để nhận thông báo mới nhất về Anime</p>
        <hr/>
        <h4>{apiData ? handleValueConvert(apiData.statistics.commentCount) + ' bình luận' : 120 +'N'}</h4>
        {commentData.map((item, index) => {
          return (
            <div key={index} className='comment'>
              <img src={item ? item.snippet.topLevelComment.snippet.authorProfileImageUrl : ''} alt='' />
              <div>
                <h3>{item ? item.snippet.topLevelComment.snippet.authorDisplayName : ''}<span>{item ? moment(item.snippet.topLevelComment.snippet.publishedAt).fromNow() : 2024}</span></h3>
                <p>{item ? item.snippet.topLevelComment.snippet.textDisplay : ''} </p>
                <div className='comment-action'>
                  <img src={like} alt='' />
                  <span>{item ? handleValueConvert(item.snippet.topLevelComment.snippet.likeCount) : 0}</span>
                  <img src={dislike} alt='' />
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default PlayVideo