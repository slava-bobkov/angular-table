import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { CarouselIndicatorsComponent } from "./components/carousel-indicators/carousel-indicators.component";
import { CarouselInnerComponent } from "./components/carousel-inner/carousel-inner.component";
import { CarouselItemComponent } from "./components/carousel-item/carousel-item.component";
import { CarouselComponent } from "./components/carousel/carousel.component";
import { CarouselConfig } from "./services/carousel.config";
import { CarouselService } from "./services/carousel.service";

@NgModule({
  declarations: [
    CarouselComponent,
    CarouselIndicatorsComponent,
    CarouselInnerComponent,
    CarouselItemComponent
  ],
  imports: [CommonModule],
  exports: [
    CarouselComponent,
    CarouselIndicatorsComponent,
    CarouselInnerComponent,
    CarouselItemComponent
  ],
  providers: [CarouselService, CarouselConfig]
})
export class CarouselModule {}
