import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { CommonService } from './Services/common.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private commonService: CommonService
  ){}
  canActivate():boolean {
    if(this.commonService.loggedIn()){
      return true;
    }
    else {
      this.router.navigate(['/login']);
      return false;
    }
  }

}
