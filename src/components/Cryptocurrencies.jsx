import { Col, Row, Card, } from 'antd'
import millify from 'millify'
import React, { useContext, useState, useEffect} from 'react'
import { Link } from "react-router-dom"
import Homepage from './Homepage';
import axios from 'axios';
import Loader from './Loader';



function Cryptocurrencies({simplified, }) {
  const [coins, setCoins] =useState([]);
  const [searchTerm, setSearchTerm] = useState('')
  const [loading, setLoading] =useState(true)
  const options = {
    method: 'GET',
    url: 'https://api.coinranking.com/v2/coins',
    
    headers: {
      'X-access-token': 'coinranking85fbbdec29cdd7f3d3996c2e328e6e833a68dc06d1c12a87',
      
    }
  };
  useEffect(() =>{
    const fetchData = async()=>{
      setLoading(true)
      try {
        const response = await axios.request(options);
        const data = response.data;
        const coinsData =data.data;
  
          setCoins(coinsData.coins);
  
      } catch (error) {
        console.error(error);
      
      }
      setLoading(false)
    };
    
    fetchData();
  },[])


  const handleSearchTermChange =(event) => {
    setSearchTerm(event.target.value)
  }
const filteredcoins  = coins.filter(coin =>
  coin.name.toLowerCase().includes(searchTerm.toLowerCase()))

  if (loading){
    return <Loader/>
  }

  return (
  
   
 <>
      {!simplified &&(
         <div className='search-crypto'>
         <input type="text" placeholder='Search cryptos' onChange={handleSearchTermChange} value={searchTerm} />
         </div>
      )}
     
       
    
    
    <Row gutter={[32, 32]} className="crypto-card-container">
      {filteredcoins?.map((currency) => (
        <Col xs={24} sm={12} lg={6} className='crypto-card' key={currency.uiid} >
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
    
    </>
  
  
  
  )
   
}

export default Cryptocurrencies