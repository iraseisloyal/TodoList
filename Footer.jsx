import { Link } from 'react-router-dom'
import { FaFacebook, FaTwitter, FaInstagram, FaPinterest, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa'
import styled from 'styled-components'

const FooterContainer = styled.footer`
  background-color: var(--secondary-dark);
  color: var(--text-light);
  padding: var(--space-xl) var(--space-md);
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: var(--space-xl);
  
  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

const FooterSection = styled.div`
  display: flex;
  flex-direction: column;
`;

const FooterTitle = styled.h3`
  font-size: var(--font-size-lg);
  margin-bottom: var(--space-md);
  color: var(--primary-light);
`;

const FooterLink = styled(Link)`
  color: var(--text-light);
  margin-bottom: var(--space-sm);
  transition: color var(--transition-fast);
  
  &:hover {
    color: var(--primary-light);
  }
`;

const FooterExternalLink = styled.a`
  color: var(--text-light);
  margin-bottom: var(--space-sm);
  transition: color var(--transition-fast);
  
  &:hover {
    color: var(--primary-light);
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: var(--space-md);
  margin-top: var(--space-sm);
`;

const SocialIcon = styled.a`
  color: var(--text-light);
  font-size: 1.5rem;
  transition: color var(--transition-fast);
  
  &:hover {
    color: var(--primary-light);
  }
`;

const ContactItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: var(--space-md);
`;

const ContactIcon = styled.span`
  margin-right: var(--space-sm);
  color: var(--primary-light);
`;

const Copyright = styled.div`
  text-align: center;
  margin-top: var(--space-xl);
  padding-top: var(--space-md);
  border-top: 1px solid rgba(255, 255, 255, 0.1);
`;

const Footer = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <FooterSection>
          <FooterTitle>Quick Links</FooterTitle>
          <FooterLink to="/">Home</FooterLink>
          <FooterLink to="/gallery">Gallery</FooterLink>
          <FooterLink to="/about">About Us</FooterLink>
          <FooterLink to="/faq">FAQs</FooterLink>
          <FooterLink to="/contact">Contact</FooterLink>
          <FooterLink to="/sitemap">Site Map</FooterLink>
        </FooterSection>
        
        <FooterSection>
          <FooterTitle>Categories</FooterTitle>
          <FooterLink to="/#bedroom">Bedroom</FooterLink>
          <FooterLink to="/#living-room">Living Room</FooterLink>
          <FooterLink to="/#dining-room">Dining Room</FooterLink>
          <FooterLink to="/#home-office">Home Office</FooterLink>
          <FooterLink to="/#outdoor">Outdoor</FooterLink>
        </FooterSection>
        
        <FooterSection>
          <FooterTitle>Contact Us</FooterTitle>
          <ContactItem>
            <ContactIcon><FaMapMarkerAlt /></ContactIcon>
            123 Furniture Lane, Design District, NY 10001
          </ContactItem>
          <ContactItem>
            <ContactIcon><FaPhone /></ContactIcon>
            (555) 123-4567
          </ContactItem>
          <ContactItem>
            <ContactIcon><FaEnvelope /></ContactIcon>
            info@hudsonfurnishings.com
          </ContactItem>
          <SocialLinks>
            <SocialIcon href="#" target="_blank" aria-label="Facebook">
              <FaFacebook />
            </SocialIcon>
            <SocialIcon href="#" target="_blank" aria-label="Twitter">
              <FaTwitter />
            </SocialIcon>
            <SocialIcon href="#" target="_blank" aria-label="Instagram">
              <FaInstagram />
            </SocialIcon>
            <SocialIcon href="#" target="_blank" aria-label="Pinterest">
              <FaPinterest />
            </SocialIcon>
          </SocialLinks>
        </FooterSection>
        
        <FooterSection>
          <FooterTitle>Newsletter</FooterTitle>
          <p>Subscribe to our newsletter for the latest updates and offers.</p>
          <form>
            <input 
              type="email" 
              placeholder="Your email address" 
              style={{
                width: '100%',
                padding: '8px 12px',
                marginBottom: '8px',
                borderRadius: '4px',
                border: 'none'
              }}
            />
            <button 
              type="submit"
              style={{
                width: '100%',
                backgroundColor: 'var(--accent-color)'
              }}
            >
              Subscribe
            </button>
          </form>
        </FooterSection>
      </FooterContent>
      
      <Copyright>
        &copy; {new Date().getFullYear()} Hudson Furnishings. All Rights Reserved.
      </Copyright>
    </FooterContainer>
  )
}

export default Footer