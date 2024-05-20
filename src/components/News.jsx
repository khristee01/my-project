import React, { useEffect, useState } from 'react'
import { Select, Typography,Row, Col, Card  } from 'antd'
import axios from 'axios';
import Title from 'antd/es/skeleton/Title';
import moment from 'moment';



const News = () => {
  const [news, setNews] = useState([])
  
  

const options = {
  method: 'GET',
  url: 'https://real-time-finance-data.p.rapidapi.com/market-trends',
  params: {
    trend_type: 'crypto',
    country: 'us',
    language: 'en'
  },
  headers: {
    'X-RapidAPI-Key': 'e3002c88b3msh6bf8590d1115b65p14ca2cjsn23921c8ba36b',
    'X-RapidAPI-Host': 'real-time-finance-data.p.rapidapi.com'
  }
};


  useEffect(() =>{
    const fetchData = async()=>{

      try {
        const response = await axios.request(options);
        const data = response.data
        console.log(data.data?.news)
        setNews(data.data?.news)
       
      } catch (error) {
        console.error(error);
      }
     
 
};
 fetchData();
 },[])

//   const options = {
//     method: 'GET',
//     url: 'https://news67.p.rapidapi.com/v2/crypto',
//     headers: {
//       'X-RapidAPI-Key': 'e3002c88b3msh6bf8590d1115b65p14ca2cjsn23921c8ba36b',
//       'X-RapidAPI-Host': 'news67.p.rapidapi.com'
//     }
//   };
//   useEffect(() =>{
//     const fetchData = async()=>{
  
//   try {
//     const response = await axios.request(options);
//     const data = response.data
//     const cryptoNews = data.news
    
//     setNews(cryptoNews)

//   } catch (error) {
//     console.error(error);
//   }
  
// };
// fetchData();
// },[])
  if(!news)return("loading..")
  
 
  return (
     <>
    

    <Row gutter={[24, 24]} className="crypto-card-container">
    {news?.map((news, i) => (
      <Col xs={24} sm={12} lg={6} key={i}>
          <Card className='news' hoverable>
            <a href={news.article_url} target="_blank" rel='noreferrer'>
            <p>{news.article_title}</p>
              <div className='news-image-container'>
              
               
                <div>
                <img className='img' src={news.article_photo_url} />
                </div>
                
              </div>
              <div> {news.source}</div>
            </a>
            
              <div>
              {moment(news.post_time_utc).startOf("ss").fromNow()}
              </div>
          </Card>
      </Col>
    ))}

  </Row>

    
    </>
  )
}

export default News