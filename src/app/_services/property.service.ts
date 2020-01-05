import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Constant } from "../constants";
import { Country, State, City, Property } from "../_models";
@Injectable({ providedIn: "root" })
export class PropertyService {
  constructor(private http: HttpClient) {}
  public baseURL: string = Constant.SiteURL;
  register(property: Property) {
    return this.http.post(this.baseURL + `/properties/`, property);
  }

  getAll() {
    return this.http.get<Property[]>(this.baseURL + `/properties/`);
  }

  get(id: number) {
    return this.http.get<Property>(this.baseURL + `/properties/` + id);
  }

  update(property: Property, id: string) {
    return this.http.put(this.baseURL + `/properties/` + id + "/", property);
  }
}
