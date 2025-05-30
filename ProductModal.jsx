import { useState, useEffect } from 'react'
import styled from 'styled-components'
import { FaTimes, FaStar, FaRegStar, FaShoppingCart } from 'react-icons/fa'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  padding: var(--space-md);
`;

const ModalContent = styled.div`
  position: relative;
  background-color: var(--background-light);
  border-radius: var(--border-radius-lg);
  max-width: 800px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  
  @media (prefers-color-scheme: dark) {
    background-color: var(--background-dark);
  }
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: transparent;
  border: none;
  color: var(--text-dark);
  font-size: 24px;
  cursor: pointer;
  z-index: 10;
  
  @media (prefers-color-scheme: dark) {
    color: var(--text-light);
  }
`;

const ProductDetails = styled.div`
  display: flex;
  flex-direction: column;
  
  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

const ImageSection = styled.div`
  flex: 1;
  padding: var(--space-md);
  
  @media (min-width: 768px) {
    max-width: 50%;
  }
`;

const InfoSection = styled.div`
  flex: 1;
  padding: var(--space-md);
`;

const ProductName = styled.h2`
  margin-top: 0;
  margin-bottom: var(--space-sm);
  color: var(--primary-dark);
`;

const ProductPrice = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: var(--space-md);
`;

const CurrentPrice = styled.span`
  font-weight: 600;
  font-size: var(--font-size-xl);
  color: var(--primary-color);
`;

const OldPrice = styled.span`
  text-decoration: line-through;
  margin-left: var(--space-md);
  font-size: var(--font-size-md);
  color: var(--text-muted);
`;

const Description = styled.p`
  margin-bottom: var(--space-md);
  line-height: 1.6;
`;

const Features = styled.ul`
  list-style-type: none;
  padding: 0;
  margin-bottom: var(--space-md);
`;

const Feature = styled.li`
  padding: var(--space-xs) 0;
  display: flex;
  align-items: center;
  
  &:before {
    content: '•';
    color: var(--primary-color);
    font-weight: bold;
    display: inline-block;
    width: 1em;
    margin-left: -1em;
  }
`;

const AddToCartButton = styled.button`
  background-color: var(--accent-color);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: var(--space-md);
  
  &:hover {
    background-color: var(--accent-dark);
  }
`;

const ButtonIcon = styled.span`
  margin-right: var(--space-sm);
`;

const SliderContainer = styled.div`
  margin-bottom: var(--space-md);
`;

const SliderImage = styled.img`
  width: 100%;
  height: 300px;
  object-fit: cover;
  border-radius: var(--border-radius-md);
`;

const ThumbnailContainer = styled.div`
  display: flex;
  gap: var(--space-sm);
  margin-top: var(--space-sm);
  overflow-x: auto;
  padding-bottom: var(--space-sm);
`;

const Thumbnail = styled.img`
  width: 60px;
  height: 60px;
  object-fit: cover;
  border-radius: var(--border-radius-sm);
  cursor: pointer;
  opacity: ${props => props.$active ? 1 : 0.6};
  border: ${props => props.$active ? '2px solid var(--primary-color)' : 'none'};
  transition: opacity var(--transition-fast), border var(--transition-fast);
  
  &:hover {
    opacity: 1;
  }
`;

const Divider = styled.hr`
  border: 0;
  height: 1px;
  background-color: var(--border-color);
  margin: var(--space-md) 0;
`;

const FeedbackSection = styled.div`
  padding: var(--space-md);
`;

const FeedbackTitle = styled.h3`
  margin-top: 0;
  margin-bottom: var(--space-md);
`;

const RatingStars = styled.div`
  display: flex;
  gap: var(--space-xs);
  margin-bottom: var(--space-md);
`;

const RatingStar = styled.span`
  color: ${props => props.$active ? 'var(--accent-color)' : 'var(--text-muted)'};
  cursor: pointer;
  font-size: 24px;
  
  &:hover {
    color: var(--accent-color);
  }
`;

const FeedbackForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
`;

const TextArea = styled.textarea`
  padding: var(--space-sm);
  border-radius: var(--border-radius-sm);
  border: 1px solid var(--border-color);
  min-height: 100px;
  font-family: inherit;
`;

const SubmitButton = styled.button`
  align-self: flex-start;
`;

const ProductModal = ({ product, isOpen, onClose }) => {
  const [activeImage, setActiveImage] = useState(0)
  const [userRating, setUserRating] = useState(0)
  const [hoverRating, setHoverRating] = useState(0)
  const [feedback, setFeedback] = useState('')
  
  // Close modal when ESC key is pressed
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.keyCode === 27) onClose()
    }
    window.addEventListener('keydown', handleEsc)
    
    return () => {
      window.removeEventListener('keydown', handleEsc)
    }
  }, [onClose])
  
  // Stop body scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    }
    
    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [isOpen])
  
  // Prevent click propagation to close modal when clicking content
  const handleContentClick = (e) => {
    e.stopPropagation()
  }
  
  const handleRating = (rating) => {
    setUserRating(rating)
  }
  
  const handleFeedbackSubmit = (e) => {
    e.preventDefault()
    // In a real app, we would send this feedback to a server
    console.log('Feedback submitted:', { rating: userRating, comment: feedback })
    alert('Thank you for your feedback!')
    setUserRating(0)
    setFeedback('')
  }
  
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    afterChange: (index) => setActiveImage(index)
  }
  
  // Generate dummy images for the gallery if product doesn't have multiple images
  const images = product.images || [product.image, product.image, product.image]
  
  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={handleContentClick}>
        <CloseButton onClick={onClose}>
          <FaTimes />
        </CloseButton>
        
        <ProductDetails>
          <ImageSection>
            <SliderContainer>
              <Slider {...sliderSettings}>
                {images.map((image, index) => (
                  <div key={index}>
                    <SliderImage src={image} alt={`${product.name} - Image ${index + 1}`} />
                  </div>
                ))}
              </Slider>
            </SliderContainer>
            
            <ThumbnailContainer>
              {images.map((image, index) => (
                <Thumbnail 
                  key={index}
                  src={image} 
                  alt={`Thumbnail ${index + 1}`}
                  $active={activeImage === index}
                  onClick={() => setActiveImage(index)}
                />
              ))}
            </ThumbnailContainer>
          </ImageSection>
          
          <InfoSection>
            <ProductName>{product.name}</ProductName>
            
            <ProductPrice>
              <CurrentPrice>${product.price.toFixed(2)}</CurrentPrice>
              {product.oldPrice && (
                <OldPrice>${product.oldPrice.toFixed(2)}</OldPrice>
              )}
            </ProductPrice>
            
            <Description>{product.description}</Description>
            
            <h4>Features:</h4>
            <Features>
              {product.features.map((feature, index) => (
                <Feature key={index}>{feature}</Feature>
              ))}
            </Features>
            
            <div>
              <strong>Brand:</strong> {product.brand}
            </div>
            <div>
              <strong>Material:</strong> {product.material}
            </div>
            <div>
              <strong>Dimensions:</strong> {product.dimensions}
            </div>
            
            <AddToCartButton>
              <ButtonIcon><FaShoppingCart /></ButtonIcon>
              Add to Cart
            </AddToCartButton>
          </InfoSection>
        </ProductDetails>
        
        <Divider />
        
        <FeedbackSection>
          <FeedbackTitle>Leave Your Feedback</FeedbackTitle>
          
          <FeedbackForm onSubmit={handleFeedbackSubmit}>
            <div>
              <p>Rate this product:</p>
              <RatingStars>
                {[1, 2, 3, 4, 5].map((star) => (
                  <RatingStar
                    key={star}
                    $active={star <= (hoverRating || userRating)}
                    onClick={() => handleRating(star)}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                  >
                    {star <= (hoverRating || userRating) ? <FaStar /> : <FaRegStar />}
                  </RatingStar>
                ))}
              </RatingStars>
            </div>
            
            <TextArea
              placeholder="Share your thoughts about this product..."
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
            />
            
            <SubmitButton type="submit">
              Submit Feedback
            </SubmitButton>
          </FeedbackForm>
        </FeedbackSection>
      </ModalContent>
    </ModalOverlay>
  )
}

export default ProductModal