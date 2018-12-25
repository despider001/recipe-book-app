import { AuthService } from './auth.sevice';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    constructor( private authService: AuthService ) {}
    canActivate(router: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise <boolean> | boolean {
        return this.authService.isAuthenticated();
    }
}
