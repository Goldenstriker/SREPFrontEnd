import { Country } from "./country";
import { State } from "./state";
import { City } from "./city";
import { PropertyStatus } from "./propertystatus";
import { PropertyType } from "./propertytype";
export class Property {
  ID: number;
  Name: string;
  Description: string;
  No_Of_BedRooms: number;
  No_Of_BathRooms: number;
  No_Of_Floors: number;
  Country: Country;
  State: State;
  City: City;
  Property_Status: PropertyStatus;
  Property_Type: PropertyType;
}
