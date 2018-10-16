import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-link',
  templateUrl: './link.component.html',
  styleUrls: ['./link.component.css']
})

export class LinkComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  images = [
  "",""
  ];
  followers = [1,2,3,4,5];

  clickFunction(){
  	console.log("Function is called")
  }

}


