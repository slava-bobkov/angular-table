import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { ICarouselState } from "../carousel.type";
import { CarouselItemComponent } from "../components/carousel-item/carousel-item.component";

@Injectable()
export class CarouselService {
  public readonly state$ = new BehaviorSubject<ICarouselState>({
    active: 0,
    interval: -1,
    items: [],
    direction: "next"
  });

  public setState(state: ICarouselState) {
    const prevState = { ...this.state$.getValue() };
    let nextState = { ...this.state$.getValue(), ...state };

    if (prevState.active !== nextState.active) {
      const active = nextState.active || 0;
      const interval = (nextState.items && nextState.items[active]?.interval) || -1;

      nextState = {
        ...nextState,
        active,
        interval
      };
    }

    this.state$.next(nextState);
  }

  public setItems(newItems: any): void {
    if (newItems.length) {
      newItems.forEach((item: CarouselItemComponent, index: number) => {
        item.index = index;
      });

      this.setState({ items: newItems, active: 0 });
    } else {
      this.reset();
    }
  }

  public direction(direction: "next" | "prev" = "next"): number {
    this.setState({ direction });

    const { active = -1, items } = this.state$.getValue();
    const itemsCount = items?.length ?? 0;

    if (itemsCount > 0) {
      return direction === "next"
        ? active === itemsCount - 1
          ? 0
          : active + 1
        : active === 0
        ? itemsCount - 1
        : active - 1;
    } else {
      return 0;
    }
  }

  public reset(): void {
    this.setState({
      active: 0,
      interval: -1,
      items: [],
      direction: "next"
    });
  }
}
