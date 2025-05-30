import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { FaBars, FaTimes, FaUser, FaShoppingCart } from 'react-icons/fa'
import styled from 'styled-components'
import logo from '/vite.svg'

const HeaderContainer = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
  background-color: ${props => props.$scrolled ? 'var(--background-light)' : 'transparent'};
  box-shadow: ${props => props.$scrolled ? 'var(--shadow-md)' : 'none'};
  transition: all var(--transition-normal);
  
  @media (prefers-color-scheme: dark) {
    background-color: ${props => props.$scrolled ? 'var(--background-dark)' : 'transparent'};
  }
`;

const HeaderContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 24px;
  max-width: 1400px;
  margin: 0 auto;
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
`;

const Logo = styled.img`
  height: 40px;
  margin-right: 16px;
`;

const VisitorCount = styled.div`
  font-size: 0.8rem;
  color: var(--text-muted);
  background-color: rgba(255, 255, 255, 0.9);
  padding: 4px 8px;
  border-radius: 12px;
  margin-left: 12px;
`;

const Nav = styled.nav`
  display: flex;
  align-items: center;
  
  @media (max-width: 1024px) {
    position: fixed;
    top: 0;
    right: ${props => props.$isOpen ? '0' : '-100%'};
    width: 250px;
    height: 100%;
    background-color: var(--background-light);
    flex-direction: column;
    align-items: flex-start;
    padding: 80px 20px 20px;
    transition: right var(--transition-normal);
    box-shadow: var(--shadow-lg);
    
    @media (prefers-color-scheme: dark) {
      background-color: var(--background-dark);
    }
  }
`;

const NavLink = styled(Link)`
  margin: 0 16px;
  padding: 8px 0;
  position: relative;
  color: ${props => props.$isActive ? 'var(--accent-color)' : 'var(--text-dark)'};
  font-weight: ${props => props.$isActive ? '600' : '500'};
  
  &:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: ${props => props.$isActive ? '100%' : '0'};
    height: 2px;
    background-color: var(--accent-color);
    transition: width var(--transition-normal);
  }
  
  &:hover {
    color: var(--accent-color);
    
    &:after {
      width: 100%;
    }
  }
  
  @media (prefers-color-scheme: dark) {
    color: ${props => props.$isActive ? 'var(--accent-color)' : 'var(--text-light)'};
  }
  
  @media (max-width: 1024px) {
    margin: 8px 0;
    width: 100%;
  }
`;

const MobileMenuButton = styled.button`
  display: none;
  background: transparent;
  border: none;
  color: var(--text-dark);
  font-size: 1.5rem;
  cursor: pointer;
  
  @media (prefers-color-scheme: dark) {
    color: var(--text-light);
  }
  
  @media (max-width: 1024px) {
    display: block;
    position: ${props => props.$isOpen ? 'fixed' : 'relative'};
    right: ${props => props.$isOpen ? '20px' : '0'};
    z-index: 1001;
  }
`;

const Header = () => {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
  
  // Close mobile menu when changing routes
  useEffect(() => {
    setMenuOpen(false)
  }, [location.pathname])
  
  const toggleMenu = () => {
    setMenuOpen(!menuOpen)
  }
  
  const isActive = (path) => {
    return location.pathname === path
  }

  return (
    <HeaderContainer $scrolled={scrolled}>
      <HeaderContent>
        <LogoContainer>
          <Link to="/">
            <Logo src={logo} alt="Hudson Furnishings" />
          </Link>
          <VisitorCount>Visitors: {window.visitorCount}</VisitorCount>
        </LogoContainer>
        
        <MobileMenuButton onClick={toggleMenu} $isOpen={menuOpen}>
          {menuOpen ? <FaTimes /> : <FaBars />}
        </MobileMenuButton>
        
        <Nav $isOpen={menuOpen}>
          <NavLink to="/" $isActive={isActive('/')}>Home</NavLink>
          <NavLink to="/gallery" $isActive={isActive('/gallery')}>Gallery</NavLink>
          <NavLink to="/about" $isActive={isActive('/about')}>About Us</NavLink>
          <NavLink to="/faq" $isActive={isActive('/faq')}>FAQs</NavLink>
          <NavLink to="/contact" $isActive={isActive('/contact')}>Contact</NavLink>
          <NavLink to="/sitemap" $isActive={isActive('/sitemap')}>Site Map</NavLink>
        </Nav>
      </HeaderContent>
    </HeaderContainer>
  )
}

export default Header