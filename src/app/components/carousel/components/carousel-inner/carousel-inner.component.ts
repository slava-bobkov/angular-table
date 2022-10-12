import {
  AfterContentInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  OnDestroy,
  QueryList
} from "@angular/core";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { slideAnimation } from "../../carousel.animation";
import { CarouselService } from "../../services/carousel.service";
import { CarouselItemComponent } from "../carousel-item/carousel-item.component";

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: "tpm-carousel-inner",
  templateUrl: "./carousel-inner.component.html",
  styleUrls: ["./carousel-inner.component.scss"],
  animations: [slideAnimation],
  changeDetection: ChangeDetectionStrategy.OnPush,
  // eslint-disable-next-line @angular-eslint/no-host-metadata-property
  host: {
    class: "carousel-inner"
  }
})
export class CarouselInnerComponent implements AfterContentInit, OnDestroy {
  @ContentChildren(CarouselItemComponent)
  private readonly contentItems!: QueryList<CarouselItemComponent>;
  private prevContentItems!: QueryList<CarouselItemComponent>;

  public active: number | undefined;
  public slide = { left: true };

  private readonly destroy$ = new Subject<void>();

  constructor(
    private readonly carouselService: CarouselService,
    private readonly cdr: ChangeDetectorRef
  ) {}

  public ngAfterContentInit(): void {
    this.setItems();

    this.contentItems.changes.pipe(takeUntil(this.destroy$)).subscribe(() => {
      this.setItems();
    });

    this.carouselService.state$.pipe(takeUntil(this.destroy$)).subscribe((state) => {
      if (this.active !== state?.active) {
        this.slide = { left: state?.direction === "next" };
        this.active = state?.active;

        this.cdr.markForCheck();
      }
    });
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public setItems(): void {
    if (this.prevContentItems?.toArray() !== this.contentItems?.toArray()) {
      this.prevContentItems = this.contentItems;
      this.carouselService.setItems(this.contentItems.toArray());
    }
  }
}
