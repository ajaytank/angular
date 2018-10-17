import { Component, OnInit } from '@angular/core';
import {Http,Response} from '@angular/http';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css']
})

export class GridComponent {
  getGameUrl= 'http://localhost:8080/game/';
  postGameUrl = 'http://localhost:8080/game/';
  getPlayGameUrl = 'http://localhost:8080/player/playGame/';
  gameId = '';
  data : any = {};
  grid = [];
  char = 'X';
  playerId = "";
  playerOrder = 1;
  
  constructor(private http:Http) {
    
    console.log(this.data);
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
    let url = this.getGameUrl + this.gameId;
  	return this.http.get(url).pipe(map(resp => {
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

    let url = this.postGameUrl + this.gameId;
    this.http.put(url, payload).subscribe(res => console.log(res.json()));
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

  startGame(playerId){
    this.playerId = playerId;
    console.log(playerId);
    let url = this.getPlayGameUrl + playerId;
    this.http.get(url).subscribe(res => {
      let response = res.json();
      console.log(response);
      this.gameId = response.gameId;
      this.getContacts(); 
      //setInterval(()=> {this.getContacts()},500);
    });

    if(this.playerOrder === 1){
      this.char = 'X';
    }else {
      this.char = 'O';
    }
    console.log(playerId);
  }

  startNewGame(){
    let payload = {
      "state": "         "
    };

    let url = this.postGameUrl + this.gameId;
    this.http.put(url, payload).subscribe(res => console.log(res.json()));
  }

}
