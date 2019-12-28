import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";

import { AppComponent } from "./app.component";
import { NavbarComponent } from "./navbar";
import { FooterComponent } from "./footer";
import { ContentComponent } from "./content";

@NgModule({
  imports: [BrowserModule, FormsModule],
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    ContentComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
