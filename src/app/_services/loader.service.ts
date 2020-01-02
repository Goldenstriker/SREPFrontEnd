import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
@Injectable({
  providedIn: "root"
})
export class LoaderserviceService {
    isLoading:boolean = false;
    show() {
        this.isLoading = true;
    }
    hide() {
        this.isLoading = false;
    }
