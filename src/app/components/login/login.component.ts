import { Component, OnInit } from '@angular/core';
import {Http,Response} from '@angular/http';
import {MyserviceService} from '../../myservice.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginUrl = "http://localhost:8080/player/login/"
  public abc = "Hi"

  constructor(private http:Http,private myservice : MyserviceService) {}

  ngOnInit() {
  }

  login(username,password){
  	console.log(username,password);
  	var url = this.loginUrl + username + ":" + password;
  	this.http.get(url).subscribe(res => {
  		if(res.text() === 'SUCCESS'){
  			this.myservice.isLoggedIn = true;
  		}
  	});
  }

}
