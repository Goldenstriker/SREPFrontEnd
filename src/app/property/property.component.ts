import { Component, OnInit, Input,Output, EventEmitter } from "@angular/core";
import { Property } from "../_models";
@Component({
  selector: "app-property",
  templateUrl: "./property.component.html",
  styleUrls: ["./property.component.css"]
})
export class PropertyComponent implements OnInit {
  @Input() property: Property;
  @Input() currentuser:string;
  @Output() propertyid = new EventEmitter<number>();
  clicked: boolean = false;
  @Input() animationDelay :number;
  constructor() {}
  ngOnInit() {}
  public addToFavourite(e){
    console.log(e);
    this.clicked = true;
    this.propertyid.emit(this.property.ID)
  }
}
