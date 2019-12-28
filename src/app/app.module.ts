import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { AppComponent } from "./app.component";
import { NavbarComponent } from "./navbar";
import { FooterComponent } from "./footer";
import { appRoutingModule } from "./app.routing";
import { JwtInterceptor, ErrorInterceptor } from "./_helpers";
import { ContentComponent } from "./content";
import { RegisterComponent } from "./register";
import { LoginComponent } from "./login";
import { AlertComponent } from "./_components";
import { HomeComponent } from "./home";
@NgModule({
  imports: [BrowserModule, FormsModule, ReactiveFormsModule, appRoutingModule],
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    ContentComponent,
    RegisterComponent,
    LoginComponent,
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
