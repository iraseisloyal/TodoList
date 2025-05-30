import { useState } from 'react'
import styled from 'styled-components'
import { FaStar, FaRegStar, FaShoppingCart } from 'react-icons/fa'
import ProductModal from './ProductModal'

const Card = styled.div`
  background-color: var(--background-light);
  border-radius: var(--border-radius-md);
  overflow: hidden;
  box-shadow: var(--shadow-md);
  transition: transform var(--transition-normal), box-shadow var(--transition-normal);
  cursor: pointer;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: var(--shadow-lg);
  }
  
  @media (prefers-color-scheme: dark) {
    background-color: var(--secondary-dark);
  }
`;

const ImageContainer = styled.div`
  width: 100%;
  height: 200px;
  overflow: hidden;
  position: relative;
`;

const ProductImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform var(--transition-normal);
  
  ${Card}:hover & {
    transform: scale(1.05);
  }
`;

const SaleTag = styled.span`
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: var(--accent-color);
  color: white;
  padding: 4px 8px;
  border-radius: var(--border-radius-sm);
  font-weight: 600;
  font-size: var(--font-size-xs);
`;

const CardContent = styled.div`
  padding: var(--space-md);
`;

const ProductName = styled.h3`
  margin: 0 0 var(--space-sm);
  font-size: var(--font-size-md);
`;

const ProductPrice = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: var(--space-sm);
`;

const CurrentPrice = styled.span`
  font-weight: 600;
  font-size: var(--font-size-md);
  color: var(--primary-color);
`;

const OldPrice = styled.span`
  text-decoration: line-through;
  margin-left: var(--space-sm);
  font-size: var(--font-size-sm);
  color: var(--text-muted);
`;

const RatingContainer = styled.div`
  display: flex;
  align-items: center;
`;

const Stars = styled.div`
  display: flex;
  color: var(--accent-color);
`;

const RatingCount = styled.span`
  margin-left: var(--space-sm);
  font-size: var(--font-size-xs);
  color: var(--text-muted);
`;

const ProductCard = ({ product }) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  
  const renderStars = (rating) => {
    const stars = []
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 !== 0
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={`full-${i}`} />)
    }
    
    if (hasHalfStar) {
      // In a real app, we'd use a half-star icon
      stars.push(<FaStar key="half" />)
    }
    
    const remainingStars = 5 - stars.length
    for (let i = 0; i < remainingStars; i++) {
      stars.push(<FaRegStar key={`empty-${i}`} />)
    }
    
    return stars
  }
  
  const openModal = () => {
    setIsModalOpen(true)
  }
  
  const closeModal = () => {
    setIsModalOpen(false)
  }
  
  return (
    <>
      <Card onClick={openModal}>
        <ImageContainer>
          <ProductImage src={product.image} alt={product.name} />
          {product.onSale && <SaleTag>SALE</SaleTag>}
        </ImageContainer>
        <CardContent>
          <ProductName>{product.name}</ProductName>
          <ProductPrice>
            <CurrentPrice>${product.price.toFixed(2)}</CurrentPrice>
            {product.oldPrice && (
              <OldPrice>${product.oldPrice.toFixed(2)}</OldPrice>
            )}
          </ProductPrice>
          <RatingContainer>
            <Stars>{renderStars(product.rating)}</Stars>
            <RatingCount>({product.reviewCount})</RatingCount>
          </RatingContainer>
        </CardContent>
      </Card>
      
      {isModalOpen && (
        <ProductModal 
          product={product} 
          isOpen={isModalOpen} 
          onClose={closeModal} 
        />
      )}
    </>
  )
}

export default ProductCard