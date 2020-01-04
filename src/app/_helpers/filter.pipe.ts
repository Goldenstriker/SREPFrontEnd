import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "filter"
})
export class FilterPipe implements PipeTransform {
  transform(items: any, searchText: any): any {
    if (!items) return [];
    searchText = JSON.parse(searchText);
    if (searchText.Country.length==0 || searchText.State.length==0 || searchText.City.length==0) return items;
    //if (searchText.length==0) return items;
    //searchText = searchText.toLowerCase();
    return items.filter(it => {
      return searchText.Country.indexOf(it.Country);
    });
  }
}
