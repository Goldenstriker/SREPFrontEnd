export class Property{
        id: number;
        Name: string;
        Description: string;
        No_Of_BedRooms: number;
        No_Of_BathRooms:number;
        No_Of_Floors : number;
        "Country": 1,
        "State": 1,
        "City": {
            "Name": "Mumbai",
            "Country": {
                "Country_ID": 1,
                "Name": "India"
            }
        },
        "Property_Status": 2,
        "Property_Type": 1
}