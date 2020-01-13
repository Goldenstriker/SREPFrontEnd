import { Component, OnInit, Input } from "@angular/core";
import { Property } from "../_models";
@Component({
  selector: "app-property",
  templateUrl: "./property.component.html",
  styleUrls: ["./property.component.css"]
})
export class PropertyComponent implements OnInit {
  @Input() property: Property;
  @Input() currentuser:string;
  constructor() {}

  ngOnInit() {}
}
