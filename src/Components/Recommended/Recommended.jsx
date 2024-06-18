import React, { useEffect, useState } from 'react'
import './Recommended.css'


import thumb1 from '../../assets/images/thumbnail1.png'
import thumb2 from '../../assets/images/thumbnail2.png'
import thumb3 from '../../assets/images/thumbnail3.png'
import thumb4 from '../../assets/images/thumbnail4.png'
import thumb5 from '../../assets/images/thumbnail5.png'
import thumb6 from '../../assets/images/thumbnail6.png'
import thumb7 from '../../assets/images/thumbnail7.png'
import thumb8 from '../../assets/images/thumbnail8.png'
import thumb9 from '../../assets/images/thumbnailSlime.jpg'
import { api, handleValueConvert } from '../../data'

const Recommended = ({categoryId}) => {
  const [apiData, setApiData] = useState([])
  console.log(apiData, 'mounted')

  const fetchData = async () => {
    const relatedVideoURL = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&regionCode=VN&maxResults=20&videoCategoryId=${categoryId}&key=${api}`
    await fetch(relatedVideoURL)
            .then(response => response.json())
            .then(data => setApiData(data?.items))
            .catch(error => console.error(error, "Loading Data failed"))

  }
  useEffect(() => {   
    fetchData()
    console.log(apiData, 'mounted - 2')
  },[categoryId])

  return (
    <div className='recommended'>
    {
      apiData.map((item, index) => {
        return (
          <div key={index} className='side-video-list'>
            <img src={item ? item.snippet.thumbnails.high.url : ''} alt='img'/>
            <div className='video-info'>
              <h4>{item ? item.snippet.title : ''} </h4>
              <p>{item ? item.snippet.channelTitle : ''} </p>
              <p>{item ? handleValueConvert(item.statistics.viewCount) : ''} </p>
            </div>
          </div>  
        )
      })
    }
      
    </div>
  )
}

export default Recommended