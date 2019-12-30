import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Constant } from "../constants";
import {Country, State, City} from "../models";
@Injectable({ providedIn: "root" })
export class MasterService {
  constructor(private http: HttpClient) {}
  public baseURL : string = Constant.SiteURL;
  getAllCountry(){
    return this.http.get<Country[]>(this.baseURL+'/country/');
  }
  getAllStateByCountry(){
    return this.http.get<State[]>(this.baseURL+'/state/');
  }
  getAllCityByState(){
    return this.http.get<City[]>(this.baseURL+'/city/');
  }
}
