import React from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'
import LineChart from './LineChart';
import millify from 'millify';
import { Col, Select, Row } from 'antd';
import { MoneyCollectFilled, DollarCircleOutlined, FundOutlined, ExclamationCircleFilled, StopOutlined, TrophyOutlined, ThunderboltOutlined, NumberOutlined, CheckOutlined, } from '@ant-design/icons';
import Typography from 'antd/es/typography/Typography';
import Loader from './Loader';
 const {Title, Text} = Typography;
 const {Option} = Select;




const CryptoDetails = () => {
   const [cryptoDetails, setCryptoDetails] = useState();
   const [timePeriod, setTimePeriod] = useState('7d')
    const {currencyUuid } = useParams();
    const [isLoading, setIsLoading] = useState(true)

   

  const options = {
    method: 'GET',
     url: `https://coinranking1.p.rapidapi.com/coin/${currencyUuid}`,

     params: {
      

      referenceCurrencyUuid: 'yhjMzLPhuIDl',
      timePeriod: "24h"
      
    },
   
    headers: {
      'X-RapidAPI-Key': 'e3002c88b3msh6bf8590d1115b65p14ca2cjsn23921c8ba36b',
      
    }
  };
  useEffect(() => {
  
    const fetchCryptoDetails = async () => {
      setIsLoading(true);
  
  try {
    const response = await axios.request(options);
    const data =(response.data);
    const details = (data?.data?.coin)
    setCryptoDetails(details)
  
    
   
    
  } catch (error) {
    console.error(error);
  }
  setIsLoading(false);
};

    

    fetchCryptoDetails();
  }, [currencyUuid, timePeriod]); // Fetch details whenever cryptoId changes

   
     const time =['3h', '24h', '7d', '30d', '3y', '5y'];

     const handleTimePeriodChange = (value) => {
      setTimePeriod(value);
    };
    
     const stats = [
      {title: 'price to USD',value: `$ ${cryptoDetails?.price && millify(cryptoDetails?.price)}`, icon:<DollarCircleOutlined/>},
      {title: 'Rank',  value: cryptoDetails?.rank, icon: <NumberOutlined/>},
      {title:'24h volume',   value:`$ ${ millify(cryptoDetails?.["24hVolume"])}`,  icon: <ThunderboltOutlined/>},
      {title:'Market Cap',  value:`$ ${cryptoDetails?.marketCap && millify(cryptoDetails?.marketCap)}`,  icon: <DollarCircleOutlined/>},
      {title: 'All-time-high(daily avg)',  value:`$ ${ millify(cryptoDetails?.allTimeHigh.price)}`,  icon: <TrophyOutlined/>},
     ]
   
     
     const genericStats =[
      {title: 'Number of Market',value: cryptoDetails?.numberOfMarkets, icon:<FundOutlined/>},

      {title: 'Number Of Exchanges',  value: cryptoDetails?.numberOfExchanges, icon: <MoneyCollectFilled/>},
      {title:'Aproved Supply',   value: cryptoDetails?.supply.supplyAt?  <CheckOutlined/> : <StopOutlined/>,  icon: <ExclamationCircleFilled/>},
      {title:'Total Supply',  value: `$ ${ millify(cryptoDetails?.supply?.total)}`,  icon: <DollarCircleOutlined/>},
      {title: 'Circulating Supply',  value:`$ ${ millify(cryptoDetails?.supply?.circulating)}`,  icon: <ExclamationCircleFilled/>},
     ]
       if (isLoading){
        return <div><Loader/>.</div>;
       } 

  return (
   <Col className="coin-detail-container" >
    <Col className='coin-heading-container'>
      <Title level ={2} className='coin-name'>
        {cryptoDetails?.name} ({cryptoDetails?.symbol}) price
      </Title>
      <p>
        {cryptoDetails?.name} live price in US dollars.
        view value statistics, market cap and supply
      </p>
      
    </Col>
    <Select 
       defaultValue="7d" 
      className='select-timeperiod' 
      placeholder="Select time Period"
      onChange={handleTimePeriodChange}
      >
        {time.map((date) =>(
        <Option  key={date} value={date} >{date}</Option>))}

      </Select>
      <LineChart currencyUuid={currencyUuid} currentPrice ={millify(cryptoDetails?.price)} coinName={cryptoDetails?.name} timePeriod={timePeriod} />
      <Col className='stats-container'>
        <Col className='coin-value-statistics'>
          <Col className='coin-value-statistics-heading'>
            <Title level={3} className="coin-details-heading">
              {cryptoDetails?.name} Statistics
            </Title>
            <p>
              An overview showing the stats of {cryptoDetails?.name}
            </p>
          </Col>
          {stats.map(({icon, title, value}) =>(
            <Col className='coin-stats'>
              <Col className='coin-stats-name'>
                <Text>{icon}</Text>
                <Text>{title}</Text>
              </Col>
              <Text className="stats">{value}</Text>
            </Col>
          ))}
        </Col>
        <Col className='other-stats-info'>
          <Col className='coin-value-statistics-heading'>
            <Title level={3} className="coin-details-heading">
              Other Value Statistics
            </Title>
            <p>
            An overview showing other statistics
            </p>
          </Col>
          {genericStats.map(({icon, title, value}) =>(
            <Col className='coin-stats'>
              <Col className='coin-stats-name'>
                <Text>{icon}</Text>
                <Text>{title}</Text>
              </Col>
              <Text className="stats">{value}</Text>
            </Col>
          ))}
        </Col>
      </Col>
      <Col className='coin-desc-link'>
        <Row className="coin-desc">
          <Title level={3} className="coin-details-heading">
            What is {cryptoDetails?.name}: <br />
            {cryptoDetails?.description}
          </Title>

        </Row>
        <Col className='coin-links'>
          <Title level={3} className="coin-details-heading">
            {cryptoDetails?.name}Links
          </Title>
          {cryptoDetails?.links.map((link )=>(
            <Row className='coin-link' key={link.name}>
              <Title level={5} className="link-name">
                {link.type}
              </Title>
              <a href={link.url} target='_blank' rel=''>
                {link.name}
              </a>
            </Row>
          ))}
        </Col>
      </Col>
   </Col>
  )
  
  
  }
export default CryptoDetails;