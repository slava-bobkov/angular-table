import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { distinctUntilKeyChanged, map, tap } from "rxjs/operators";
import { ICarouselIndex, ICarouselState } from "../carousel.type";
import { CarouselItemComponent } from "../components/carousel-item/carousel-item.component";

@Injectable()
export class CarouselService {
  public readonly state$ = new BehaviorSubject<ICarouselState>({
    activeItemIndex: -1,
    items: [],
    direction: "next"
  });
  public readonly items$ = this.state$.asObservable().pipe(
    distinctUntilKeyChanged("items"),
    map(({ items }) => items)
  );
  public readonly carouselIndex$ = new BehaviorSubject<ICarouselIndex>({});

  public setState(state: ICarouselState) {
    const prevState = { ...this.state$.getValue() };
    const nextState = { ...this.state$.getValue(), ...state };

    this.state$.next(nextState);

    if (prevState.activeItemIndex !== nextState.activeItemIndex) {
      const activeItemIndex = nextState.activeItemIndex || 0;
      const itemInterval = (nextState.items && nextState.items[activeItemIndex]?.interval) || -1;

      this.setIndex({
        active: nextState.activeItemIndex,
        interval: itemInterval,
        lastItemIndex: (nextState.items?.length ?? 0) - 1
      });
    }
  }

  public setItems(newItems: any): void {
    if (newItems.length) {
      newItems.forEach((item: CarouselItemComponent, index: number) => {
        item.index = index;
      });

      this.setState({ items: newItems });
    } else {
      this.reset();
    }
  }

  public direction(direction: "next" | "prev" = "next"): number {
    this.setState({ direction });

    const { activeItemIndex = -1, items } = this.state$.getValue();
    const itemsCount = items?.length ?? 0;

    if (itemsCount > 0) {
      return direction === "next"
        ? activeItemIndex === itemsCount - 1
          ? 0
          : activeItemIndex + 1
        : activeItemIndex === 0
        ? itemsCount - 1
        : activeItemIndex - 1;
    } else {
      return 0;
    }
  }

  public setIndex(index: ICarouselIndex): void {
    this.carouselIndex$.next(index);
  }

  public reset(): void {
    this.setState({
      activeItemIndex: -1,
      items: [],
      direction: "next"
    });
  }
}
