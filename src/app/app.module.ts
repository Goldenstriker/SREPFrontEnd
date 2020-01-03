import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { AppComponent } from "./app.component";
import { NavbarComponent } from "./navbar";
import { FooterComponent } from "./footer";
import { appRoutingModule } from "./app.routing";
import { JwtInterceptor, ErrorInterceptor, LoaderInterceptor } from "./_helpers";
import { ContentComponent } from "./content";
import { RegisterComponent } from "./register";
import { LoginComponent } from "./login";
import { AlertComponent } from "./_components";
import { HomeComponent } from "./home";
import { RegisterpropertyComponent } from './registerproperty';
import { LoaderService } from './_services';
import { PropertyComponent } from './property';
import { LoaderComponent } from './loader';
@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    appRoutingModule
  ],
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    ContentComponent,
    RegisterComponent,
    LoginComponent,
    HomeComponent,
    AlertComponent,
    RegisterpropertyComponent,
    PropertyComponent,
    LoaderComponent
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true, providers:[LoaderService] }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
