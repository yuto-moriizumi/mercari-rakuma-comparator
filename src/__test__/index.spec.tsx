import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import { MercariIcon } from '@/components/MercariIcon';

describe('Rendering', () => {
  it('should contain the correct alt text', () => {
    render(<MercariIcon />);
    expect(screen.getByAltText('Mercari icon')).toBeInTheDocument();
  });

  describe('should display the correct image', () => {
    it('should display the valid image', () => {
      render(<MercariIcon valid />);
      expect(screen.getByAltText('Mercari icon').getAttribute('src')).toContain(
        'mercari.png'
      );
    });

    it('should display the invalid image', () => {
      render(<MercariIcon />);
      expect(screen.getByAltText('Mercari icon').getAttribute('src')).toContain(
        'mercari_gray.png'
      );
    });
  });
});
