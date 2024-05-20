import React from 'react'
import Navbar from './components/Navbar'
import { Layout, Typography, Space  } from 'antd'
import { Link, Route, Routes, } from 'react-router-dom'
import Exchanges from './components/Exchanges'
import Homepage from './components/Homepage'
import CryptoDetails from './components/CryptoDetails'
import News from './components/News'
import Cryptocurrencies from './components/Cryptocurrencies'
import axios, { Axios } from 'axios'
import { useEffect,useState } from 'react'








const App = () => {
  
  const options = {
    method: 'GET',
     url: `https://coinranking1.p.rapidapi.com/coins`,

     params: {
      //  uuid:  "Qwsogvtv82FCd",

      referenceCurrencyUuid: 'yhjMzLPhuIDl',
      timePeriod: '24h'
    },
   
    headers: {
      'X-RapidAPI-Key': 'e3002c88b3msh6bf8590d1115b65p14ca2cjsn23921c8ba36b',
      
    }
  };
  useEffect(() => {
    const fetchCryptoDetails = async () => {
  
  try {
    const response = await axios.request(options);
    const data = (response.data);
    const currency = data.data.coins
   

    
  } catch (error) {
    console.error(error);
  }
 
    };

    fetchCryptoDetails();
  }, [options]);

  return (
    <div className='app'>
      <div className='navbar'>
        <Navbar/>
        
      </div>
      <div className='main'>
        <Layout >
          
          <div className='routes'>
          
            <Routes>
              <Route path='/' element={<Homepage />}/> 
              <Route path='/cryptocurrencies' element={<Cryptocurrencies />}/>  
              <Route path='/exchanges' element={<Exchanges/>}/>
              <Route path={`/crypto/:currencyUuid`} element={<CryptoDetails  />}/> 
              <Route path='/news' element={<News/>}/> 

              
            </Routes>
           
             
            
          </div>

          
         
        </Layout>

     
      <div className='footer'>
        <Typography.Title level={5} style={{color: 'white', textAlign: "center"}}>
          Cryptoverse <br/>
          All right reserved
        </Typography.Title>
        <Space>
          <Link to="/">Home</Link>
          <Link to="/exchanges">Exchanges</Link>
          <Link to="/news">News</Link>
        </Space>

      </div>
      </div>
    </div>
  )
}

export default App;