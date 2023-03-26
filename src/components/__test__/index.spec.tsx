import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import { MercariIcon } from '@/components/MercariIcon';
import { RakumaIcon } from '@/components/RakumaIcon';

describe('MercariIcon', () => {
  const ALT_TEXT = 'Mercari icon';
  it('should contain the correct alt text', () => {
    render(<MercariIcon />);
    expect(screen.getByAltText(ALT_TEXT)).toBeInTheDocument();
  });

  it('should display the valid image', () => {
    render(<MercariIcon valid />);
    expect(screen.getByAltText(ALT_TEXT).getAttribute('src')).toContain(
      'mercari.png'
    );
  });

  it('should display the invalid image', () => {
    render(<MercariIcon />);
    expect(screen.getByAltText(ALT_TEXT).getAttribute('src')).toContain(
      'mercari_gray.png'
    );
  });
});

describe('RakumaIcon', () => {
  const ALT_TEXT = 'Rakuma icon';
  it('should contain the correct alt text', () => {
    render(<RakumaIcon />);
    expect(screen.getByAltText(ALT_TEXT)).toBeInTheDocument();
  });

  it('should display the valid image', () => {
    render(<RakumaIcon valid />);
    expect(screen.getByAltText(ALT_TEXT).getAttribute('src')).toContain(
      'rakuma.png'
    );
  });

  it('should display the invalid image', () => {
    render(<RakumaIcon />);
    expect(screen.getByAltText(ALT_TEXT).getAttribute('src')).toContain(
      'rakuma_gray.png'
    );
  });
});
