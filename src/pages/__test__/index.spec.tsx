import '@testing-library/jest-dom/extend-expect';
import { fireEvent, render, screen } from '@testing-library/react';
import Home from '..';

describe('Home', () => {
  it('should display title', () => {
    render(<Home />);
    expect(screen.getByText('メルカリラクマ 配送料比較表')).toBeInTheDocument();
  });

  it('should filter shippings', () => {
    const RAKUMA_SHIPPING = 'かんたんラクマパック ゆうパケットポスト';
    render(<Home />);
    const radioGroup = screen.getByRole('radiogroup');
    const mercariButton = radioGroup?.children[1];

    expect(screen.getByText(RAKUMA_SHIPPING)).toBeInTheDocument();
    mercariButton && fireEvent.click(mercariButton);
    expect(screen.queryByText(RAKUMA_SHIPPING)).toBeNull();
    expect(screen.getByText('らくらくメルカリ便 ネコポス')).toBeInTheDocument();
  });
});
