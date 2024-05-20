import React, { createContext, useEffect, useState } from 'react';
import axios, { Axios } from 'axios'
import { Statistic, Typography, Row, Col, Card, } from 'antd';
import { Link } from "react-router-dom"
import moment from 'moment';
import Loader from './Loader';


import millify from "millify"
import Cryptocurrencies from './Cryptocurrencies';
import News from './News';
import CryptoDetails from './CryptoDetails';


const  { Title } = Typography;





 const Homepage = () => {
  
    const [news, setNews] = useState([])
    const [ coins,  setCoins] =useState([]);
    const [loading, setloading] = useState(true)
    
    
  
  const options2 = {
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
        setloading(true)
  
        try {
          const response = await axios.request(options2);
          const data = response.data;
          setNews(data.data?.news.slice(0, 3))
         
        } catch (error) {
          console.error(error);
        }
       
   setloading(false)
  };
   fetchData();
   },[])



 const [globalStats, setGlobalStats] = useState()
  const options = {
    method: 'GET',
    url: 'https://api.coinranking.com/v2/coins',
    
    headers: {
      'X-access-token': 'coinranking85fbbdec29cdd7f3d3996c2e328e6e833a68dc06d1c12a87',
      
    }
  };
  useEffect(() =>{
    const fetchData = async()=>{
      try {
        const response = await axios.request(options);
        const data = response.data;
        const coinsData =data.data;
         setGlobalStats(coinsData.stats)
          setCoins(coinsData.coins.slice(0, 10));

      } catch (error) {
        console.error(error);
      
      }
      
    };
    
    fetchData();
  },[])


   
   if (loading){
    return <Loader/>
   }
 


  return (
   <>
    <Title level={2} className='heading'>Global crypto Stats</Title>
    <Row>
        <Col span={12}><Statistic title="Total Cryptocurrencies" value={globalStats?.total}  /></Col>
        <Col span={12}><Statistic title="Total Exchages"  value={millify (globalStats?.totalExchanges)} /></Col>
        <Col span={12}><Statistic title="Total Market cap"  value={millify(globalStats?.totalMarketCap)} /></Col>
        <Col span={12}><Statistic title="Total 24 hours vol" value={millify(globalStats?.total24hVolume)}/></Col>
        <Col span={12}><Statistic title="Total Markets" value={millify(globalStats?.totalMarkets)}  /></Col>
    </Row>
    <div className='home-heading-container'>
      <Title level={2} className='home-title'>Top 10 cryptocurrencies in the world</Title>
      <Title level={3} className='show-more'><Link to='/Cryptocurrencies' >Show More</Link>
       
     
        
        </Title>

    </div>
   
    <Row gutter={[32, 32]} className="crypto-card-container">
      {coins?.map((currency) => (
        <Col xs={24} sm={12} lg={6} className='crypto-card' key={currency.uuid} >
          <Link to={`/crypto/${currency.uuid}`}>
            <Card 
             title={`${currency.rank}.${currency.name}`}
             extra={<img className='crypto-image' src={currency.iconUrl}/>}
             hoverable>
              <p>price: {millify(currency.price)}</p>
              <p>markert Cap: {millify(currency.marketCap)}</p>
              <p>Daily Change: {millify(currency.change)}%</p>
             
            </Card>
          </Link>
        </Col>
      ))}

    </Row>
   
 
    
    <div className='home-heading-container'>
      <Title level={2} className='home-title'>Latest Crypto News</Title>
      <Title level={3} className='show-more'><Link to='/news'>Show More</Link></Title>

    </div>
    <Row gutter={[24, 24]} className="crypto-card-container">
    {news?.map((news, i) => (
      <Col xs={24} sm={12} lg={6} key={i}>
          <Card className='news' hoverable>
            <a href={news.article_url} target="_blank" rel='noreferrer'>
            <p>{news.article_title}</p>
              <div className='news-image-container'>
              
                
                <img className='img' src={news.article_photo_url} />
                
              </div>
              <div> {news.source}</div>
            </a>
            <div>
            {moment(news.post_time_utc).startOf("ss").fromNow()}
            
            </div>
            
              <div>
                
              </div>
          </Card>
      </Col>
    ))}

  </Row>
  
    </>
  )
}

export default Homepage