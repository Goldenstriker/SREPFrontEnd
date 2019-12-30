import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Constant } from "../constants";
@Injectable({ providedIn: "root" })
export class MasterService {
  constructor(private http: HttpClient) {}
  public baseURL : string = Constant.SiteURL;
  getAllCountry(){
    return this.http.get(this.baseURL)
  }
}
