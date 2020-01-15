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

  ngOnInit() {
    this.loadAllProperty();
    let chart = new CanvasJS.Chart("chartContainer1", {
		theme: "light2",
		animationEnabled: true,
		exportEnabled: true,
		title:{
			text: "Monthly Property Data"
		},
		data: [{
			type: "pie",
			showInLegend: true,
			toolTipContent: "<b>{name}</b>: ${y} (#percent%)",
			indexLabel: "{name} - #percent%",
			dataPoints: [
				{ y: 450, name: "Sold" },
				{ y: 500, name: "Available" },
				{ y: 300, name: "On Hold" }
			]
		}]
	});
		
	chart.render();
  }
  private loadAllProperty() {
    this.propertyService.getAll().subscribe(properties => {
      // properties;
      let data = properties.map(data => {
        return { x: data.AreaSqFt, y: data.Price };
      });
      let chart = new CanvasJS.Chart("chartContainer", {
        animationEnabled: true,
        exportEnabled: false,
        zoomEnabled: true,
        title: {
          text: "Real Estate Rates"
        },
        axisX: {
          title: "Area (in sq. ft)",
          minimum: 10,
          maximum: 5000
        },
        axisY: {
          title: "Price (in USD)",
          valueFormatString: "$#,##0k"
        },
        data: [
          {
            type: "scatter",
            toolTipContent: "<b>Area: </b>{x} sq.ft<br/><b>Price: </b>${y}k",
            dataPoints: data
          }
        ]
      });
      chart.render();
    });
  }
}
