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

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: "tpm-carousel-indicators",
  templateUrl: "./carousel-indicators.component.html",
  styleUrls: ["./carousel-indicators.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CarouselIndicatorsComponent implements OnInit, OnDestroy {
  public readonly items$ = this.carouselService.items$;
  public active = 0;

  private readonly destroy$ = new Subject<void>();

  constructor(
    private readonly carouselService: CarouselService,
    private readonly cdr: ChangeDetectorRef
  ) {}

  public ngOnInit(): void {
    this.carouselService.carouselIndex$.pipe(takeUntil(this.destroy$)).subscribe((nextIndex) => {
      if ("active" in nextIndex) {
        this.active = nextIndex.active ?? 0;
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
        activeItemIndex: index
      });
    }
  }
}
