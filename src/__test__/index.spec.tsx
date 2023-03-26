/**
 * @jest-environment jsdom
 */
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { MercariIcon } from '@/components/MercariIcon';
import '@testing-library/jest-dom';

describe('Rendering', () => {
  it('Should render hello text', () => {
    render(<MercariIcon />);
    expect(screen.getByAltText('Mercari icon')).toBeInTheDocument();
  });
});
