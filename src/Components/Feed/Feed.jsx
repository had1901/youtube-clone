import React, { useEffect, useState } from 'react'
import './Feed.css'

import thumb1 from '../../assets/images/thumbnail1.png'
import thumb2 from '../../assets/images/thumbnail2.png'
import thumb3 from '../../assets/images/thumbnail3.png'
import thumb4 from '../../assets/images/thumbnail4.png'
import thumb5 from '../../assets/images/thumbnail5.png'
import thumb6 from '../../assets/images/thumbnail6.png'
import thumb7 from '../../assets/images/thumbnail7.png'
import thumb8 from '../../assets/images/thumbnail8.png'
import thumb9 from '../../assets/images/thumbnailSlime.jpg'
import { Link } from 'react-router-dom'
import { api, handleValueConvert } from './../../data';
import moment from 'moment'

const Feed = ({category}) => {
  const [data,setData] = useState([])

  const fetchData = async () => {
    const urlListVideo = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=50&regionCode=VN&videoCategoryId=${category}&key=${api}`
    await fetch(urlListVideo)
            .then(response => response.json())
            .then(data => setData(data.items))
  }

  useEffect(() => {
    fetchData()
  },[category])

  return (
      <div className='feed'>
        {
          data.map((item, index) => {
            return (
              <Link key={item.id} to={`video/${item.snippet.categoryId}/${item.id}`} className='card'>
                <img src={item.snippet.thumbnails.medium.url} alt='' />
                <h2 className=''>{item.snippet.title}</h2>
                <h3>{item.snippet.channelTitle}</h3>
                <p>{handleValueConvert(item.statistics.viewCount)} - {moment(item.snippet.publishedAt).fromNow()}</p>
              </Link>
            )
          })
        }
      </div>
  )
}

export default Feed