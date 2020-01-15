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
      exportEnabled: false,
      title: {
        text: ""
      },
      legend: {
        fontFamily: "calibri",
        fontSize: 14,
        horizontalAlign: "left",
        verticalAlign: "center"
      },
      data: [
        {
          type: "pie",
          showInLegend: true,
          toolTipContent: "<b>{name}</b>: ${y} (#percent%)",
          indexLabel: "{name} - #percent%",
          dataPoints: [
            { y: 450, name: "Sold" },
            { y: 500, name: "Available" },
            { y: 300, name: "On Hold" }
          ]
        }
      ]
    });
    let chart1 = new CanvasJS.Chart("chartContainer", {
      theme: "light2",
      animationEnabled: true,
      exportEnabled: false,
      title: {
        text: ""
      },
      legend: {
        fontFamily: "calibri",
        fontSize: 14,
        horizontalAlign: "left",
        verticalAlign: "center"
      },
      data: [
        {
          legendMarkerType: "square",
          type: "pie",
          showInLegend: true,
          toolTipContent: "<b>{name}</b>: ${y} (#percent%)",
          indexLabel: "{name} - #percent%",
          dataPoints: [{ y: 450, name: "Sell" }, { y: 500, name: "Rent" }]
        }
      ]
    });
    chart1.render();
    chart.render();
  }
  private loadAllProperty() {
    this.propertyService.getAll().subscribe(properties => {
      // properties;
      let data = properties.map(data => {
        return { x: data.AreaSqFt, y: data.Price };
      });
      /*let chart = new CanvasJS.Chart("chartContainer", {
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
      chart.render();*/
    });
  }
}
