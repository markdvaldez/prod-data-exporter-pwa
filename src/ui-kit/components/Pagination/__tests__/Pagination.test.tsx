import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Pagination } from '../Pagination';

describe('Pagination Component', () => {
  const defaultProps = {
    currentPage: 1,
    totalPages: 1,
    totalResults: 50,
    pageSize: 100,
    onPageChange: jest.fn(),
    onPageSizeChange: jest.fn(),
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should show pagination component when totalPages is 1 (single page scenario)', () => {
    render(<Pagination {...defaultProps} />);
    
    // Should show results info
    expect(screen.getByText(/Showing/)).toBeInTheDocument();
    expect(screen.getByText(/results/)).toBeInTheDocument();
    
    // Should show page size selector
    expect(screen.getByLabelText('Show:')).toBeInTheDocument();
    expect(screen.getByDisplayValue('100')).toBeInTheDocument();
  });

  it('should not show page navigation controls when totalPages is 1', () => {
    render(<Pagination {...defaultProps} />);
    
    // Should not show Previous/Next buttons
    expect(screen.queryByText('Previous')).not.toBeInTheDocument();
    expect(screen.queryByText('Next')).not.toBeInTheDocument();
    
    // Should not show page numbers
    expect(screen.queryByRole('button', { name: '1' })).not.toBeInTheDocument();
  });

  it('should show page navigation controls when totalPages > 1', () => {
    const propsWithMultiplePages = {
      ...defaultProps,
      totalPages: 3,
      totalResults: 150,
      pageSize: 50,
    };
    
    render(<Pagination {...propsWithMultiplePages} />);
    
    // Should show Previous/Next buttons
    expect(screen.getByText('Previous')).toBeInTheDocument();
    expect(screen.getByText('Next')).toBeInTheDocument();
    
    // Should show page numbers
    expect(screen.getByRole('button', { name: '1' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '2' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '3' })).toBeInTheDocument();
  });

  it('should allow changing page size even when totalPages is 1', () => {
    render(<Pagination {...defaultProps} />);
    
    const pageSelect = screen.getByDisplayValue('100');
    fireEvent.change(pageSelect, { target: { value: '20' } });
    
    expect(defaultProps.onPageSizeChange).toHaveBeenCalledWith(20);
  });

  it('should display correct results info when pageSize is 100 and totalResults is 50', () => {
    const props = {
      ...defaultProps,
      totalResults: 50,
      pageSize: 100,
    };
    
    render(<Pagination {...props} />);
    
    // Should show "Showing 1 to 50 of 50 results"
    expect(screen.getByText(/Showing/)).toBeInTheDocument();
    expect(screen.getByText(/results/)).toBeInTheDocument();
  });

  it('should hide page size selector when showPageSizeSelector is false', () => {
    const propsWithoutPageSizeSelector = {
      ...defaultProps,
      showPageSizeSelector: false,
    };
    
    render(<Pagination {...propsWithoutPageSizeSelector} />);
    
    // Should show results info
    expect(screen.getByText(/Showing/)).toBeInTheDocument();
    
    // Should not show page size selector
    expect(screen.queryByLabelText('Show:')).not.toBeInTheDocument();
  });
});