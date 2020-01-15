import { Component, OnInit } from "@angular/core";
//import * as CanvasJS from "../canvasjs.min";
import * as CanvasJS from "../canvasjs.min";
import { Property } from "../_models";
import { PropertyService } from "../_services";
import { map } from "rxjs/operators";
@Component({
  selector: "app-management",
  templateUrl: "./management.component.html",
  styleUrls: ["./management.component.css"]
})
export class ManagementComponent implements OnInit {
  properties: Property[] = [];
  constructor(private propertyService: PropertyService) {}

  ngOnInit() {}
  private loadAllProperty() {
    this.propertyService.getAll().subscribe(properties => {
      // properties;

      let chart = new CanvasJS.Chart("chartContainer", {
        animationEnabled: true,
        exportEnabled: true,
        zoomEnabled: true,
        title: {
          text: "Real Estate Rates"
        },
        axisX: {
          title: "Area (in sq. ft)",
          minimum: 790,
          maximum: 2260
        },
        axisY: {
          title: "Price (in USD)",
          valueFormatString: "$#,##0k"
        },
        data: [
          {
            type: "scatter",
            toolTipContent: "<b>Area: </b>{x} sq.ft<br/><b>Price: </b>${y}k",
            dataPoints: properties.map(data => {
              return { x: data.AreaSqFt, y: data.Price };
            })
          }
        ]
      });
      chart.render();
    });
  }
}
