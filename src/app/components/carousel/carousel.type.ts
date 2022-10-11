import { CarouselItemComponent } from "./components/carousel-item/carousel-item.component";

export interface ICarouselOptions {
  interval?: number;
  animate?: boolean;
  activeIndex?: number;
  direction?: "next" | "prev";
}

export interface ICarouselState {
  activeItemIndex?: number;
  animate?: boolean;
  items?: Array<CarouselItemComponent>;
  direction?: "next" | "prev";
}

export interface ICarouselIndex {
  active?: number;
  interval?: number;
  lastItemIndex?: number;
}
