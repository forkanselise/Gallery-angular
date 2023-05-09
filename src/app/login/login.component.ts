import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginInfo!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loginInfo = this.fb.group({
      Username: [''],
      Password: ['']
    })
  }

  loggedIn() {
    console.log(this.loginInfo?.value)
    // this.router.navigate.['gallery'];
    this.router.navigateByUrl('/gallery')
  }



}
