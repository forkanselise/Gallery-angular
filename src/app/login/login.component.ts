import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonService } from '../Services/common.service';
import { take } from 'rxjs';
import { Token } from '@angular/compiler';
import { cloneDeep } from 'lodash';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginInfo!: FormGroup;
  waiting: boolean = false;

  hide: boolean = true;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private commonService: CommonService
  ) { }

  ngOnInit(): void {
    this.loginInfo = this.fb.group({
      Username: [''],
      Password: ['']
    })
  }

  registerUser() {
    this.waiting = true;
    this.commonService.registerUser(this.loginInfo.value).subscribe((response) => {
      console.log(response);
      this.waiting = false
      if(response){
        console.log(response);
      }
      else {
        console.log("Registration failed try again")
      }
    })
  }

  loggedIn() {
    this.waiting = true;
    // console.log(this.loginInfo?.value)
    // this.router.navigate.['gallery'];
    // this.loginInfo.get('Password')?.setValue(this.loginInfo.value.Password.toLowerCase());
    // console.log(this.loginInfo.value);
    this.commonService.verification(this.loginInfo?.value).subscribe(res=>{
      let authToken = res.constructor(res)
      // console.log(authToken.token)
      document.cookie = `auth/url = ${authToken.token}`

      // console.log(authToken.toString())

      this.waiting = false;
      if(res){
        this.router.navigateByUrl('/gallery')
      }
      else{
        alert("Password Incorrect")
      }
    })

  }



}
