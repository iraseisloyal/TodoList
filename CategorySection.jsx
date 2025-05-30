import { useState } from 'react'
import styled from 'styled-components'
import ProductCard from '../common/ProductCard'
import { FaFilter, FaTimes } from 'react-icons/fa'

const SectionContainer = styled.section`
  padding: var(--space-xxl) 0;
  scroll-margin-top: 80px;
`;

const SectionHeader = styled.div`
  margin-bottom: var(--space-xl);
  text-align: center;
`;

const SectionTitle = styled.h2`
  font-size: var(--font-size-xl);
  color: var(--primary-dark);
  margin-bottom: var(--space-sm);
  
  @media (max-width: 768px) {
    font-size: var(--font-size-lg);
  }
`;

const SectionDescription = styled.p`
  max-width: 700px;
  margin: 0 auto;
  color: var(--text-muted);
`;

const ContentContainer = styled.div`
  display: flex;
  gap: var(--space-xl);
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 var(--space-lg);
  
  @media (max-width: 1024px) {
    flex-direction: column;
  }
`;

const FilterSidebar = styled.div`
  width: 250px;
  flex-shrink: 0;
  
  @media (max-width: 1024px) {
    width: 100%;
    position: ${props => props.$mobileFiltersOpen ? 'fixed' : 'static'};
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: var(--background-light);
    z-index: 100;
    padding: var(--space-xl);
    overflow-y: auto;
    
    @media (prefers-color-scheme: dark) {
      background-color: var(--background-dark);
    }
  }
`;

const FilterGroup = styled.div`
  margin-bottom: var(--space-xl);
`;

const FilterTitle = styled.h3`
  font-size: var(--font-size-md);
  margin-bottom: var(--space-md);
  color: var(--primary-dark);
`;

const FilterList = styled.ul`
  list-style: none;
  padding: 0;
`;

const FilterItem = styled.li`
  margin-bottom: var(--space-sm);
`;

const FilterCheckbox = styled.div`
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  cursor: pointer;
`;

const CheckboxInput = styled.input`
  cursor: pointer;
`;

const CheckboxLabel = styled.label`
  cursor: pointer;
`;

const PriceRange = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
`;

const RangeSlider = styled.input`
  width: 100%;
`;

const PriceDisplay = styled.div`
  display: flex;
  justify-content: space-between;
`;

const FiltersToggleButton = styled.button`
  display: none;
  align-items: center;
  gap: var(--space-sm);
  margin-bottom: var(--space-md);
  
  @media (max-width: 1024px) {
    display: flex;
  }
`;

const MobileFilterHeader = styled.div`
  display: none;
  
  @media (max-width: 1024px) {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: var(--space-lg);
  }
`;

const CloseFiltersButton = styled.button`
  background: none;
  border: none;
  font-size: var(--font-size-lg);
  cursor: pointer;
  color: var(--primary-dark);
  padding: var(--space-sm);
`;

const ProductsGrid = styled.div`
  flex: 1;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: var(--space-lg);
`;

const NoResults = styled.div`
  grid-column: 1 / -1;
  text-align: center;
  padding: var(--space-xl);
  color: var(--text-muted);
`;

const CategorySection = ({ id, title, description, products }) => {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
  const [priceRange, setPriceRange] = useState(1000)
  const [selectedTypes, setSelectedTypes] = useState([])
  const [selectedMaterials, setSelectedMaterials] = useState([])
  const [selectedBrands, setSelectedBrands] = useState([])
  
  // Extract unique filter values
  const types = [...new Set(products.map(p => p.type))]
  const materials = [...new Set(products.map(p => p.material))]
  const brands = [...new Set(products.map(p => p.brand))]
  
  const toggleType = (type) => {
    if (selectedTypes.includes(type)) {
      setSelectedTypes(selectedTypes.filter(t => t !== type))
    } else {
      setSelectedTypes([...selectedTypes, type])
    }
  }
  
  const toggleMaterial = (material) => {
    if (selectedMaterials.includes(material)) {
      setSelectedMaterials(selectedMaterials.filter(m => m !== material))
    } else {
      setSelectedMaterials([...selectedMaterials, material])
    }
  }
  
  const toggleBrand = (brand) => {
    if (selectedBrands.includes(brand)) {
      setSelectedBrands(selectedBrands.filter(b => b !== brand))
    } else {
      setSelectedBrands([...selectedBrands, brand])
    }
  }
  
  // Filter products based on selections
  const filteredProducts = products.filter(product => {
    const matchesPrice = product.price <= priceRange
    const matchesType = selectedTypes.length === 0 || selectedTypes.includes(product.type)
    const matchesMaterial = selectedMaterials.length === 0 || selectedMaterials.includes(product.material)
    const matchesBrand = selectedBrands.length === 0 || selectedBrands.includes(product.brand)
    
    return matchesPrice && matchesType && matchesMaterial && matchesBrand
  })

  return (
    <SectionContainer id={id}>
      <SectionHeader>
        <SectionTitle>{title}</SectionTitle>
        <SectionDescription>{description}</SectionDescription>
      </SectionHeader>
      
      <ContentContainer>
        <FiltersToggleButton onClick={() => setMobileFiltersOpen(true)}>
          <FaFilter /> Filter Products
        </FiltersToggleButton>
        
        <FilterSidebar $mobileFiltersOpen={mobileFiltersOpen}>
          <MobileFilterHeader>
            <h3>Filter Products</h3>
            <CloseFiltersButton onClick={() => setMobileFiltersOpen(false)}>
              <FaTimes />
            </CloseFiltersButton>
          </MobileFilterHeader>
          
          <FilterGroup>
            <FilterTitle>Price Range</FilterTitle>
            <PriceRange>
              <RangeSlider
                type="range"
                min="0"
                max="5000"
                step="100"
                value={priceRange}
                onChange={(e) => setPriceRange(Number(e.target.value))}
              />
              <PriceDisplay>
                <span>$0</span>
                <span>Up to ${priceRange}</span>
                <span>$5000</span>
              </PriceDisplay>
            </PriceRange>
          </FilterGroup>
          
          <FilterGroup>
            <FilterTitle>Product Type</FilterTitle>
            <FilterList>
              {types.map((type) => (
                <FilterItem key={type}>
                  <FilterCheckbox>
                    <CheckboxInput
                      type="checkbox"
                      id={`type-${type}`}
                      checked={selectedTypes.includes(type)}
                      onChange={() => toggleType(type)}
                    />
                    <CheckboxLabel htmlFor={`type-${type}`}>{type}</CheckboxLabel>
                  </FilterCheckbox>
                </FilterItem>
              ))}
            </FilterList>
          </FilterGroup>
          
          <FilterGroup>
            <FilterTitle>Material</FilterTitle>
            <FilterList>
              {materials.map((material) => (
                <FilterItem key={material}>
                  <FilterCheckbox>
                    <CheckboxInput
                      type="checkbox"
                      id={`material-${material}`}
                      checked={selectedMaterials.includes(material)}
                      onChange={() => toggleMaterial(material)}
                    />
                    <CheckboxLabel htmlFor={`material-${material}`}>{material}</CheckboxLabel>
                  </FilterCheckbox>
                </FilterItem>
              ))}
            </FilterList>
          </FilterGroup>
          
          <FilterGroup>
            <FilterTitle>Brand</FilterTitle>
            <FilterList>
              {brands.map((brand) => (
                <FilterItem key={brand}>
                  <FilterCheckbox>
                    <CheckboxInput
                      type="checkbox"
                      id={`brand-${brand}`}
                      checked={selectedBrands.includes(brand)}
                      onChange={() => toggleBrand(brand)}
                    />
                    <CheckboxLabel htmlFor={`brand-${brand}`}>{brand}</CheckboxLabel>
                  </FilterCheckbox>
                </FilterItem>
              ))}
            </FilterList>
          </FilterGroup>
        </FilterSidebar>
        
        <ProductsGrid>
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          ) : (
            <NoResults>
              <h3>No products match your filters</h3>
              <p>Try adjusting your filter criteria</p>
            </NoResults>
          )}
        </ProductsGrid>
      </ContentContainer>
    </SectionContainer>
  )
}

export default CategorySection