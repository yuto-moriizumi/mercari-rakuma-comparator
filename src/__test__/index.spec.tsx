import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import Home from "../pages";

const MERCARI_SHIPPING = "らくらくメルカリ便 ネコポス";
const RAKUMA_SHIPPING = "かんたんラクマパック ゆうパケットポスト";

describe("Home", () => {
  beforeEach(() => {
    render(<Home />);
  });

  it("should display title", () => {
    expect(screen.getByText("メルカリラクマ 配送料比較表")).toBeInTheDocument();
  });

  it("should filter rakuma shippings out", () => {
    const radioGroup = screen.getByRole("radiogroup");
    const mercariButton = radioGroup?.children[1];
    expect(screen.getByText(RAKUMA_SHIPPING)).toBeInTheDocument();
    mercariButton && fireEvent.click(mercariButton);
    expect(screen.queryByText(RAKUMA_SHIPPING)).toBeNull();
    expect(screen.getByText(MERCARI_SHIPPING)).toBeInTheDocument();
  });

  it("should filter mercari shippings out", () => {
    const radioGroup = screen.getByRole("radiogroup");
    const rakumaButton = radioGroup?.children[2];

    expect(screen.getByText(MERCARI_SHIPPING)).toBeInTheDocument();
    rakumaButton && fireEvent.click(rakumaButton);
    expect(screen.queryByText(MERCARI_SHIPPING)).toBeNull();
    expect(screen.getByText(RAKUMA_SHIPPING)).toBeInTheDocument();
  });

  it("should filter small shippings out", () => {
    const SMALL_SHIPPING = "ミニレター";
    const BIG_SHIPPING = "レターパックプラス";

    const heightInput = screen.getByLabelText("高さ");
    expect(screen.getByText(SMALL_SHIPPING)).toBeInTheDocument();
    heightInput && fireEvent.change(heightInput, { target: { value: 10 } });
    fireEvent.blur(heightInput);
    expect(screen.queryByText(SMALL_SHIPPING)).toBeNull();
    expect(screen.getByText(BIG_SHIPPING)).toBeInTheDocument();
  });

  it("should filter heavy shippings out", () => {
    const LIGHT_SHIPPING = "ミニレター";
    const HEAVY_SHIPPING = "レターパックプラス";

    const gInput = screen.getByLabelText("重さ");
    expect(screen.getByText(LIGHT_SHIPPING)).toBeInTheDocument();
    gInput && fireEvent.change(gInput, { target: { value: 100 } });
    fireEvent.blur(gInput);
    expect(screen.queryByText(LIGHT_SHIPPING)).toBeNull();
    expect(screen.getByText(HEAVY_SHIPPING)).toBeInTheDocument();
  });
});
