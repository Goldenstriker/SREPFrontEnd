import { Component, OnInit } from '@angular/core';
import { LoaderService } from '../_services';
@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent implements OnInit {

  constructor(private loadingserviceService:LoaderService) { }

  ngOnInit() {
  }

}