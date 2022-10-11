import { BooleanInput, coerceBooleanProperty } from "@angular/cdk/coercion";
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnDestroy,
  OnInit
} from "@angular/core";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { CarouselService } from "../../services/carousel.service";

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: "tpm-carousel-item",
  templateUrl: "./carousel-item.component.html",
  styleUrls: ["./carousel-item.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: "carousel-item",
    "[class.active]": "_active"
  }
})
export class CarouselItemComponent implements OnInit, OnDestroy {
  static ngAcceptInputType_active: BooleanInput;

  @Input() public interval: number = -1;
  @Input()
  public set active(value: boolean) {
    this._active = coerceBooleanProperty(value);
    // this.cdr.markForCheck();
  }
  public _active = false;

  public index?: number;

  private readonly destroy$ = new Subject<void>();

  constructor(
    private readonly carouselService: CarouselService,
    private readonly cdr: ChangeDetectorRef
  ) {}

  public ngOnInit(): void {
    this.carouselService.carouselIndex$.pipe(takeUntil(this.destroy$)).subscribe((nextIndex) => {
      if ("active" in nextIndex) {
        this._active = nextIndex.active === this.index;
        this.cdr.detectChanges();
      }
    });
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
