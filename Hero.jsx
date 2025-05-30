import styled from 'styled-components'

const HeroContainer = styled.section`
  position: relative;
  height: 80vh;
  min-height: 500px;
  display: flex;
  align-items: center;
  background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.7)), url('https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg');
  background-size: cover;
  background-position: center;
  color: var(--text-light);
  
  @media (max-width: 768px) {
    height: 60vh;
  }
`;

const HeroContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 var(--space-lg);
  width: 100%;
`;

const HeroTitle = styled.h1`
  font-size: var(--font-size-hero);
  margin-bottom: var(--space-md);
  font-weight: 700;
  max-width: 700px;
  
  @media (max-width: 768px) {
    font-size: var(--font-size-xxl);
  }
`;

const HeroSubtitle = styled.p`
  font-size: var(--font-size-lg);
  margin-bottom: var(--space-xl);
  max-width: 600px;
  
  @media (max-width: 768px) {
    font-size: var(--font-size-md);
  }
`;

const HeroButtons = styled.div`
  display: flex;
  gap: var(--space-md);
  
  @media (max-width: 480px) {
    flex-direction: column;
  }
`;

const PrimaryButton = styled.a`
  display: inline-block;
  padding: var(--space-md) var(--space-lg);
  background-color: var(--accent-color);
  color: var(--text-light);
  font-weight: 600;
  border-radius: var(--border-radius-md);
  text-align: center;
  transition: background-color var(--transition-normal);
  
  &:hover {
    background-color: var(--accent-dark);
    color: var(--text-light);
  }
`;

const SecondaryButton = styled.a`
  display: inline-block;
  padding: var(--space-md) var(--space-lg);
  background-color: transparent;
  color: var(--text-light);
  font-weight: 600;
  border: 2px solid var(--text-light);
  border-radius: var(--border-radius-md);
  text-align: center;
  transition: background-color var(--transition-normal), color var(--transition-normal);
  
  &:hover {
    background-color: var(--text-light);
    color: var(--primary-dark);
  }
`;

const Hero = () => {
  return (
    <HeroContainer>
      <HeroContent>
        <HeroTitle>Where Comfort Meets Style</HeroTitle>
        <HeroSubtitle>
          Discover our curated collection of luxury furniture designed to transform your space into a sanctuary of comfort and elegance.
        </HeroSubtitle>
        <HeroButtons>
          <PrimaryButton href="#featured-products">Shop Now</PrimaryButton>
          <SecondaryButton href="#about-section">Learn More</SecondaryButton>
        </HeroButtons>
      </HeroContent>
    </HeroContainer>
  )
}

export default Hero