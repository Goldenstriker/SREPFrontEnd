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
  property_purposeChartData = [];
  property_typeChartData = [];
  property_statusChartData = [];
  property_city_count = [];
  constructor(private propertyService: PropertyService) {}

  ngOnInit() {
    this.loadAllProperty();
  }
  private loadAllProperty() {
    this.propertyService.getChartData().subscribe(data => {
      let property_type = JSON.parse(data["property_type"]);
      let property_purpose = JSON.parse(data["property_purpose"]);
      let property_status = JSON.parse(data["property_status"]);
      let city_count = JSON.parse(data["city_count"]);
      console.log(property_type);

      Object.keys(property_type).forEach(x => {
        this.property_typeChartData.push({ y: property_type[x], name: x });
      });

      Object.keys(property_purpose).forEach(x => {
        this.property_purposeChartData.push({
          y: property_purpose[x],
          name: x
        });
      });
      Object.keys(property_status).forEach(x => {
        this.property_statusChartData.push({ y: property_status[x], name: x });
      });
      Object.keys(city_count).forEach(x => {
        this.property_city_count.push({ y: city_count[x], label: x });
      });
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
            toolTipContent: "<b>{name}</b>: {y} (#percent%)",
            indexLabel: "{name} - #percent%",
            dataPoints: this.property_typeChartData
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
            toolTipContent: "<b>{name}</b>: {y} (#percent%)",
            indexLabel: "{name} - #percent%",
            dataPoints: this.property_purposeChartData
          }
        ]
      });
      let chart3 = new CanvasJS.Chart("chartContainer3", {
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
            toolTipContent: "<b>{name}</b>: {y} (#percent%)",
            indexLabel: "{name} - #percent%",
            dataPoints: this.property_statusChartData
          }
        ]
      });
      let usersStateBarChart = new CanvasJS.Chart("users-state-bar-chart", {
        animationDuration: 800,
        animationEnabled: true,
        backgroundColor: "transparent",
        colorSet: "customColorSet",
        axisX: {
          labelFontColor: "#717171",
          labelFontSize: 18,
          lineThickness: 0,
          tickThickness: 0
        },
        axisY: {
          gridThickness: 0,
          lineThickness: 0,
          tickThickness: 0,
          valueFormatString: " "
        },
        toolTip: {
          cornerRadius: 0,
          fontStyle: "normal"
        },
        data: [
          {
            indexLabelFontColor: "#717171",
            indexLabelFontFamily: "calibri",
            indexLabelFontSize: 18,
            indexLabelPlacement: "outside",
            type: "bar",
            dataPoints: this.property_city_count
          }
        ]
      });

      usersStateBarChart.render();
      chart3.render();
      chart1.render();
      chart.render();
    });
  }
}
