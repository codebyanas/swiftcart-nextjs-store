import { render, screen } from '@testing-library/react';
import Home from '../app/page'; // Adjust path if needed

// 🛠 Mock the components with simple divs containing data-testid
jest.mock('@/components/Banner', () => () => <div data-testid="banner" />);
jest.mock('@/components/FlashDeals/Card', () => () => <div data-testid="product-card" />);
jest.mock('@/components/TopCategories/TopCategoriesProducts', () => () => <div data-testid="top-categories-card" />);
jest.mock('@/components/NewArrivals/NewArrivalProducts', () => () => <div data-testid="new-arrival-products" />);
jest.mock('@/components/BigDiscount/BigDiscount', () => () => <div data-testid="big-discount" />);
jest.mock('@/components/Services/Services', () => () => <div data-testid="services" />);

describe('Home component', () => {
  it('should render all sections correctly', () => {
    render(<Home />);

    expect(screen.getByTestId('banner')).toBeInTheDocument();
    expect(screen.getByTestId('product-card')).toBeInTheDocument();
    expect(screen.getByTestId('top-categories-card')).toBeInTheDocument();
    expect(screen.getByTestId('new-arrival-products')).toBeInTheDocument();
    expect(screen.getByTestId('big-discount')).toBeInTheDocument();
    expect(screen.getByTestId('services')).toBeInTheDocument();
  });
});
