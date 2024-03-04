
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators'; import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
@Injectable({
    providedIn: 'root'
})
export class HttpInterceptorService implements HttpInterceptor {
    constructor( private router: Router) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const clonedRequest = request.clone({
        headers: request.headers.set('X-Requested-With', 'XMLHttpRequest'),
        withCredentials: true
    });
    
    return next.handle(clonedRequest).pipe(tap(() => {},
        (err: any) => {
            if (err instanceof HttpErrorResponse) {
                if (err.status !== 401) {
                    return;
                }
                this.router.navigateByUrl('/login');
            }
        }));
    }
}