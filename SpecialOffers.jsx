import styled from 'styled-components'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

const OffersSection = styled.section`
  padding: var(--space-xxl) 0;
  background-color: var(--secondary-light);
  color: var(--text-light);
  
  @media (prefers-color-scheme: dark) {
    background-color: var(--secondary-dark);
  }
`;

const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: var(--space-xl);
`;

const SectionTitle = styled.h2`
  font-size: var(--font-size-xl);
  margin-bottom: var(--space-sm);
`;

const SectionDescription = styled.p`
  max-width: 700px;
  margin: 0 auto;
`;

const OffersContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 var(--space-lg);
`;

const OfferCard = styled.div`
  background: linear-gradient(135deg, var(--primary-dark) 0%, var(--primary-color) 100%);
  border-radius: var(--border-radius-lg);
  padding: var(--space-xl);
  margin: var(--space-md);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  box-shadow: var(--shadow-lg);
  min-height: 300px;
`;

const OfferTitle = styled.h3`
  font-size: var(--font-size-lg);
  margin-bottom: var(--space-md);
  color: var(--accent-light);
`;

const OfferDescription = styled.p`
  margin-bottom: var(--space-lg);
`;

const DiscountBadge = styled.div`
  background-color: var(--accent-color);
  color: var(--text-light);
  padding: var(--space-sm) var(--space-md);
  border-radius: var(--border-radius-lg);
  font-size: var(--font-size-lg);
  font-weight: 700;
  margin-bottom: var(--space-lg);
`;

const OfferButton = styled.a`
  background-color: var(--text-light);
  color: var(--primary-dark);
  padding: var(--space-sm) var(--space-lg);
  border-radius: var(--border-radius-md);
  text-decoration: none;
  font-weight: 600;
  transition: background-color var(--transition-normal), transform var(--transition-normal);
  margin-top: auto;
  
  &:hover {
    background-color: var(--accent-light);
    color: var(--text-dark);
    transform: translateY(-3px);
  }
`;

const PromoCode = styled.div`
  background-color: rgba(255, 255, 255, 0.1);
  padding: var(--space-sm) var(--space-lg);
  border-radius: var(--border-radius-md);
  margin: var(--space-md) 0;
  font-family: monospace;
  font-size: var(--font-size-lg);
  letter-spacing: 2px;
`;

const SpecialOffers = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };
  
  const offers = [
    {
      title: "Summer Sale",
      description: "Enjoy our biggest sale of the season with discounts on all outdoor furniture!",
      discount: "Up to 40% OFF",
      promoCode: "SUMMER2025",
      linkText: "Shop Summer Sale"
    },
    {
      title: "New Customer Special",
      description: "First-time customers receive a special discount on their initial purchase.",
      discount: "15% OFF",
      promoCode: "WELCOME15",
      linkText: "Redeem Offer"
    },
    {
      title: "Living Room Bundle",
      description: "Purchase a sofa and get matching accent chairs at a special price.",
      discount: "Save $299",
      promoCode: "BUNDLE299",
      linkText: "View Bundles"
    },
    {
      title: "Free Delivery",
      description: "Enjoy free shipping on all orders over $500 within the continental US.",
      discount: "FREE Shipping",
      promoCode: "SHIPFREE",
      linkText: "Learn More"
    },
    {
      title: "Home Office Sale",
      description: "Transform your workspace with our curated home office collection.",
      discount: "25% OFF",
      promoCode: "OFFICE25",
      linkText: "Shop Office"
    }
  ];

  return (
    <OffersSection id="special-offers">
      <SectionHeader>
        <SectionTitle>Special Offers</SectionTitle>
        <SectionDescription>
          Take advantage of our limited-time promotions and exclusive deals to save on your next furniture purchase.
        </SectionDescription>
      </SectionHeader>
      
      <OffersContainer>
        <Slider {...settings}>
          {offers.map((offer, index) => (
            <div key={index}>
              <OfferCard>
                <OfferTitle>{offer.title}</OfferTitle>
                <DiscountBadge>{offer.discount}</DiscountBadge>
                <OfferDescription>{offer.description}</OfferDescription>
                <PromoCode>Code: {offer.promoCode}</PromoCode>
                <OfferButton href="#">{offer.linkText}</OfferButton>
              </OfferCard>
            </div>
          ))}
        </Slider>
      </OffersContainer>
    </OffersSection>
  )
}

export default SpecialOffers