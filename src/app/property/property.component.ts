import { Component, OnInit, Input } from "@angular/core";
import { Property } from "../models";
@Component({
  selector: "app-property",
  templateUrl: "./property.component.html",
  styleUrls: ["./property.component.css"]
})
export class PropertyComponent implements OnInit {
  @Input() property: Property;
  constructor() {}

  ngOnInit() {}
}
