import { CarouselItemComponent } from "./components/carousel-item/carousel-item.component";

export interface ICarouselOptions {
  active?: number;
  interval?: number;
  direction?: "next" | "prev";
}

export interface ICarouselState {
  active?: number;
  interval?: number;
  items?: Array<CarouselItemComponent>;
  direction?: "next" | "prev";
}
