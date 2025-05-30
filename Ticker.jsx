import { useState, useEffect } from 'react'
import styled, { keyframes } from 'styled-components'

const scrollAnimation = keyframes`
  0% {
    transform: translateX(100%);
  }
  100% {
    transform: translateX(-100%);
  }
`;

const TickerContainer = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: var(--primary-dark);
  color: var(--text-light);
  padding: 8px 0;
  overflow: hidden;
  z-index: 100;
`;

const TickerContent = styled.div`
  white-space: nowrap;
  animation: ${scrollAnimation} 30s linear infinite;
  display: inline-block;
`;

const Ticker = ({ location }) => {
  const [currentTime, setCurrentTime] = useState(new Date())
  
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)
    
    return () => {
      clearInterval(timer)
    }
  }, [])
  
  const formatDate = (date) => {
    const options = { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    }
    return date.toLocaleDateString(undefined, options)
  }
  
  const formatTime = (date) => {
    const options = { 
      hour: '2-digit', 
      minute: '2-digit', 
      second: '2-digit'
    }
    return date.toLocaleTimeString(undefined, options)
  }

  return (
    <TickerContainer>
      <TickerContent>
        📅 {formatDate(currentTime)} &nbsp;|&nbsp; 
        ⏰ {formatTime(currentTime)} &nbsp;|&nbsp; 
        📍 Location: {location} &nbsp;|&nbsp; 
        🏠 Welcome to Hudson Furnishings - Where comfort meets style &nbsp;|&nbsp; 
        🛋️ Summer Sale Now On! Up to 40% off selected items &nbsp;|&nbsp; 
        🚚 Free delivery on orders over $500 &nbsp;|&nbsp;
      </TickerContent>
    </TickerContainer>
  )
}

export default Ticker