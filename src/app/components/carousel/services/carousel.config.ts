import { Injectable } from "@angular/core";

@Injectable()
export class CarouselConfig {
  public activeIndex = 0;
  public direction: "next" | "prev" = "next";
  public interval = 2000;
}
