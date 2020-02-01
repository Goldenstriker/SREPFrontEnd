import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Constant } from "../constants";
import { Country, State, City, PropertyType, PropertyStatus, PropertyPurpose } from "../_models";
import { Observable } from "rxjs";
import { shareReplay } from "rxjs/operators";
@Injectable({ providedIn: "root" })
export class MasterService {
  constructor(private http: HttpClient) {}
  public baseURL: string = Constant.SiteURL;
  private countries : Observable<Country[]> ;
  private cities : Observable<City[]> ;
  private states : Observable<State[]> ;
  private purpose : Observable<PropertyPurpose[]> ;
  private types : Observable<PropertyType[]> ;
  private status : Observable<PropertyStatus[]> ;
  private countData : Observable<any>;
  getAllCountry() {
    if(!this.countries){
      this.countries  = this.http.get<Country[]>(this.baseURL + "/country/").pipe(shareReplay(1));
    }
    //return this.http.get<Country[]>(this.baseURL + "/country/");
    return this.countries;
  }
  getAllStateByCountry() {
    if(!this.states){
      this.states = this.http.get<State[]>(this.baseURL + "/state/").pipe(shareReplay(1));
    }
    //return this.http.get<State[]>(this.baseURL + "/state/");
    return this.states;
  }
  getAllCityByState() {
    if(!this.cities){
        this.cities = this.http.get<City[]>(this.baseURL + "/city/").pipe(shareReplay(1));
    }
    return this.cities;
  }
  getPropertyType() {
    if(!this.types){
      this.types = this.http.get<PropertyType[]>(this.baseURL + "/propertytype/").pipe(shareReplay(1));
    }
    return this.types;
  }
  getPropertyStatus() {
    //return this.http.get<PropertyStatus[]>(this.baseURL + "/propertystatus/");
    if(!this.status){
      this.status =this.http.get<PropertyStatus[]>(this.baseURL + "/propertystatus/").pipe(shareReplay(1));
    }
    return this.status;
  }
  getPropertyPurpose() {
    //return this.http.get<PropertyPurpose[]>(this.baseURL + "/propertypurpose/");
     if(!this.purpose){
      this.purpose =this.http.get<PropertyPurpose[]>(this.baseURL + "/propertypurpose/").pipe(shareReplay(1));
    }
    return this.purpose;
  }
  getCount(){
    if(!this.countData){
        this.purpose =this.http.get<a>(this.baseURL + "/countdata/").pipe(shareReplay(1));
    }
    return this.countData;
  }
}
