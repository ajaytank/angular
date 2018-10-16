import { Component, OnInit } from '@angular/core';
import {Http,Response} from '@angular/http';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css']
})

export class GridComponent {
  url= 'http://localhost:8080/game/5bc4efcedb54705d6c158588';
  postUrl = 'http://localhost:8080/game/5bc4efcedb54705d6c158588';
  data : any = {};
  grid = [];
  char = 'X';
  playerId = "";
  playerOrder = 1;
  
  constructor(private http:Http) {
    //this.getContacts(); 
    setInterval(()=> {this.getContacts()},500);
    console.log(this.data);
  }

  clickButton(){
  	console.log("this.data");
  	console.log(this.data);
  	console.log(this.url);
    //this.getContacts();

  }

  getContacts(){
  	this.getData().subscribe(data => {
  		console.log(data);
  		this.data = data;
  		let state = this.data.state;
  		let arr = state.split('');
  		this.grid[0] = arr.splice(0,3);
  		this.grid[1] = arr.splice(0,3);
  		this.grid[2] = arr.splice(0,3);
  		console.log(this.grid);

      if(this.data.playerOneId === name){
        this.playerOrder = 1;
      }else {
        this.playerOrder = 2;
      }

  	});
  }				

  getData(){
  	return this.http.get(this.url).pipe(map(resp => {
  		 return resp.json();
  	}));
  }

  updateGame(i,j){

    if(this.grid[i][j] === this.char) {
      return;
    }
    this.grid[i][j] = this.char;
    let newState = this.gridToString(this.grid);

    let payload = {
      "state": newState
    };

    this.http.put(this.postUrl, payload).subscribe(res => console.log(res.json()));
  }

  gridToString(grid){
    let p = "";
    for(var i = 0 ; i < grid.length ; i++){
      for(var j = 0; j < grid[i].length ; j++){
        p = p + grid[i][j];
      }
    }
    return p;
  }

  setPlayerId(playerId){
    this.playerId = playerId;
    if(this.playerOrder === 1){
      this.char = 'X';
    }else {
      this.char = 'O';
    }
    console.log(playerId);
  }

}
