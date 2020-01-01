import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Constant } from "../constants";
import { Country, State, City, Property } from "../models";
@Injectable({ providedIn: "root" })
export class PropertyService {
  constructor(private http: HttpClient) {}
  public baseURL: string = Constant.SiteURL;
  register(property: Property) {
    console.log(Constant.SiteURL);
    return this.http.post(this.baseURL + `/register/`, property);
  }
}
