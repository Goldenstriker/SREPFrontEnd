import { Component, OnInit } from '@angular/core';
import { LoaderserviceService } from '../_service';
@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent implements OnInit {

  constructor(private loadingserviceService:LoaderserviceService) { }

  ngOnInit() {
  }

}