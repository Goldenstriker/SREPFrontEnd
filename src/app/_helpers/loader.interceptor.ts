import { Injectable } from "@angular/core";
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";
import { finalize,delay } from "rxjs/operators";

import { LoaderserviceService } from '../_services';

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {

    constructor(public loaderService: LoaderserviceService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this.loaderService.show();
        return next.handle(req).pipe(
            delay(5000),
            finalize(() => { this.loaderService.hide();})
        );
    }

}