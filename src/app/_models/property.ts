import { Country } from "./country";
import { State } from "./state";
import { City } from "./city";
import { PropertyStatus } from "./propertystatus";
import { PropertyType } from "./propertytype";
import { PropertyPurpose } from "./propertypurpose";
import { User } from "./user";
export class Property {
  ID: number;
  Name: string;
  Description: string;
  No_Of_BedRooms: number;
  No_Of_BathRooms: number;
  No_Of_Floors: number;
  No_Of_LivingRooms: number;
  Country: Country;
  State: State;
  City: City;
  Property_Status: PropertyStatus;
  Property_Type: PropertyType;
  Property_Purpose: PropertyPurpose;
  AreaSqFt: number;
  Price: number;
  Address: string;
  UserCreatedBy: User;
  UserCreatedDate: Date;
}
