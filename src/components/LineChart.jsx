import React, { useState } from 'react'
import { Chart as ChartJS, Ticks, scales } from 'chart.js/auto';
import { Col, Select, Row, Typography } from 'antd';
import axios from 'axios';
import { useEffect } from 'react';
import { Line } from 'react-chartjs-2';

const {Title, Text} =Typography
const LineChart = ({currencyUuid, coinName, currentPrice, timePeriod}) => {
   const [chartData, setChartData] = useState({});
const [coinHistory, setCoinHistory] = useState({})
const [change , setChange] =useState()
    const option = {
      method: 'GET',
      url: `https://coinranking1.p.rapidapi.com/coin/${currencyUuid}/history`,
      params: {
        
        referenceCurrencyUuid: 'yhjMzLPhuIDl',
        timePeriod: timePeriod
      },
      headers: {
        'X-RapidAPI-Key': 'e3002c88b3msh6bf8590d1115b65p14ca2cjsn23921c8ba36b',
        'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com'
      }
    };
    useEffect(() =>{
        const fetchData = async()=>{
    try {
        const response = await axios.request(option);
        const history =(response.data.data.history);
        const priceChange =response.data.data.change
        setChange(priceChange)
        setCoinHistory(history)
       
    } catch (error) {
        console.error(error);
    }
};

fetchData();
}, [currencyUuid, timePeriod])
 const coinPrice =[];
 const coinTimestamp = []
 for(let i = 0; i < coinHistory?.length; i ++ ){
  coinPrice.push(coinHistory[i]?.price);
  const timestamp = new Date(coinHistory[i]?.timestamp *1000);
 coinTimestamp.push(timestamp.toLocaleDateString());
 }
  const data = {
    labels: coinTimestamp,
    datasets:[
      {
        label: 'price in USD',
        data: coinPrice,
        fill: false,
        
        borderColor: '#0071bd'

      }
    ]
  }
  const options ={

    indexAxis: 'x',
    myScales: {
      y:[
        {
          ticks:{
            align: "end"
          }
        }
      ]
    }

    
  };

  return (
   <>
   
      <Row className='chart-header'>
        <Title level={2}  className="chart-title">
            {coinName} Price Chart
        </Title>
        <Col className='price-container'>
          <Title level={5} className='price-change'>{change}%</Title>

          <Title level={5} className='current-price' >Current {coinName} price: ${currentPrice}</Title>
       
        </Col>
       

      </Row>
      
     <Line data= {data} options={options}/>
       
   </>
  )
}

export default LineChart