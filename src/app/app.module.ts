import { NgModule } from "@angular/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { BrowserModule } from "@angular/platform-browser";
import { TranslateModule } from "@ngx-translate/core";

import { AppComponent } from "./app.component";
import { HeaderModule } from "./components/header/header.module";
import { TableModule } from "./components/table/table.module";
import { CarouselModule } from "./components/carousel/carousel.module";

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    TranslateModule.forRoot(),
    HeaderModule,
    TableModule,
    CarouselModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
