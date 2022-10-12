import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Inject,
  Input,
  OnDestroy,
  OnInit,
  Output
} from "@angular/core";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { CarouselConfig } from "../../services/carousel.config";
import { CarouselService } from "../../services/carousel.service";

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: "tpm-carousel",
  template: "<ng-content></ng-content>",
  styleUrls: ["./carousel.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [CarouselConfig, CarouselService],
  host: {
    class: "carousel slide"
  }
})
export class CarouselComponent implements OnInit, OnDestroy {
  @Input() public active = 0;
  @Input() public interval = 0;
  @Input() public direction: "next" | "prev" = "next";

  @Output() private readonly itemChange = new EventEmitter<number>();

  private timerId!: any;
  private activeItemInterval = 0;

  private readonly destroy$ = new Subject<void>();

  constructor(
    @Inject(CarouselConfig)
    private readonly config: CarouselConfig,
    private readonly carouselService: CarouselService
  ) {
    Object.assign(this, this.config);
  }

  public ngOnInit(): void {
    this.carouselService.state$.pipe(takeUntil(this.destroy$)).subscribe((state) => {
      this.itemChange.emit(state.active);

      this.activeItemInterval =
        typeof state.interval === "number" && state.interval > -1 ? state.interval : this.interval;

      this.setTimer();
    });
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private setTimer(): void {
    const interval = this.activeItemInterval || 0;

    this.resetTimer();

    if (interval > 0) {
      this.timerId = setTimeout(() => {
        this.carouselService.setState({
          active: this.carouselService.direction(this.direction)
        });
      }, interval);
    }
  }

  private resetTimer(): void {
    clearTimeout(this.timerId);
  }
}
