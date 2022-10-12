import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit
} from "@angular/core";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { CarouselService } from "../../services/carousel.service";
import { CarouselItemComponent } from "../carousel-item/carousel-item.component";

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: "tpm-carousel-indicators",
  templateUrl: "./carousel-indicators.component.html",
  styleUrls: ["./carousel-indicators.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CarouselIndicatorsComponent implements OnInit, OnDestroy {
  public items: Array<CarouselItemComponent> = [];
  public active: number = 0;

  private readonly destroy$ = new Subject<void>();

  constructor(
    private readonly carouselService: CarouselService,
    private readonly cdr: ChangeDetectorRef
  ) {}

  public ngOnInit(): void {
    this.carouselService.state$.pipe(takeUntil(this.destroy$)).subscribe((state) => {
      if (this.items !== state.items) {
        this.items = state.items ?? [];
      }

      if (this.active !== state.active) {
        this.active = state.active ?? 0;
      }

      this.cdr.detectChanges();
    });
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public onClick(index: number): void {
    if (index !== this.active) {
      this.carouselService.setState({
        direction: index < this.active ? "prev" : "next",
        active: index
      });
    }
  }
}
