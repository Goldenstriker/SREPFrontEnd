import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "filter"
})
export class FilterPipe implements PipeTransform {
  transform(items: any, searchText: any): any {
    if (!items) return [];
    searchText = JSON.parse(searchText);
    //if (searchText.Country.length==0 || searchText.State.length==0 || searchText.City.length==0) return items;
    //if (searchText.PropertyType.length == 0) return items;
    //searchText = searchText.toLowerCase();
    Object.keys(searchText).forEach(x => {
      if (searchText[x].length != 0) {
        items = items.filter(it => {
          if (x == "City" || x == "State")
            return searchText[x].indexOf(it[x][x + "_ID"]) != -1;
          else return searchText[x].indexOf(it[x].ID) != -1;
        });
      }
    });
    /*return items.filter(it => {
      return searchText.PropertyType.indexOf(it.Property_Type) != -1;
    });*/
    return items;
  }
}
