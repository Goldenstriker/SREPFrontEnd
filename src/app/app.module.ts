import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { AppComponent } from "./app.component";
import { NavbarComponent } from "./navbar";
import { FooterComponent } from "./footer";

import { ContentComponent } from "./content";
import {RegisterComponent} from './register';
@NgModule({
  imports: [BrowserModule, FormsModule, ReactiveFormsModule],
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    ContentComponent,
    RegisterComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
