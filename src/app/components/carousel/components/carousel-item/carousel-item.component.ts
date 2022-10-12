import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnDestroy,
  OnInit
} from "@angular/core";
import { asapScheduler, Subject } from "rxjs";
import { observeOn, takeUntil } from "rxjs/operators";
import { CarouselService } from "../../services/carousel.service";

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: "tpm-carousel-item",
  templateUrl: "./carousel-item.component.html",
  styleUrls: ["./carousel-item.component.scss"],
  changeDetection: ChangeDetectionStrategy.Default,
  host: {
    class: "carousel-item",
    "[class.active]": "_active"
  }
})
export class CarouselItemComponent implements OnInit, OnDestroy {
  @Input() public interval: number = -1;
  @Input()
  public set active(value: boolean) {
    this._active = value;
  }
  public _active = false;

  public index?: number;

  private readonly destroy$ = new Subject<void>();

  constructor(
    private readonly carouselService: CarouselService,
    private readonly cdr: ChangeDetectorRef
  ) {}

  public ngOnInit(): void {
    this.carouselService.state$
      .pipe(takeUntil(this.destroy$), observeOn(asapScheduler))
      .subscribe((state) => {
        this._active = state.active === this.index;

        this.cdr.markForCheck();
      });
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
