import { Component, OnInit } from '@angular/core';
import {Http,Response} from '@angular/http';
import { map } from 'rxjs/operators';
import { MyserviceService } from '../../myservice.service';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css']
})

export class GridComponent {
  //host = 'http://localhost:8080';
  host = 'http://13.232.148.135:8081';
  getGameUrl= this.host + '/game/';
  postGameUrl = this.host + '/game/';
  getPlayGameUrl = this.host + '/player/playGame/';
  gameId = '';
  data : any = {};
  grid = [];
  char = 'X';
  playerId = "";
  playerOrder = 1;
  loggedIn = false;
  activePlayer = 1;
  result = null;
  
  constructor(private http:Http,private myservice: MyserviceService) {
    
  }

  loginUrl = this.host + "/player/login/"

  login(username,password){
    console.log(username,password);
    var url = this.loginUrl + username + ":" + password;
    this.http.get(url).pipe(map(res => 
      {
        console.log(res.json());
        return res.json(); 
      }
    )).subscribe(res => {
      if(res){
        this.loggedIn = true;
        this.playerId = res.id;
        this.gameId = res.gameId;
        this.startGame(this.playerId)
      }else{
        this.loggedIn = false;
      }
    });
  }

  newGame(){
    this.startGame(this.playerId);
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

      if(this.data.playerOneId === this.playerId){
        this.playerOrder = 1;
        this.char = 'X';
      }else {
        this.playerOrder = 2;
        this.char = 'O';
      }

      this.activePlayer = data.activePlayer;
      console.log(data.result);
      
        this.result = data.result;
      

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

    if(this.result != null){
      return;
    }

    if(this.activePlayer === this.playerOrder) {
      this.grid[i][j] = this.char;
      let newState = this.gridToString(this.grid);

      let payload = {
        "state": newState
      };

      let url = this.postGameUrl + this.gameId;
      this.http.put(url, payload).subscribe(res => console.log(res.json()));
    }
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
    this.result = null;
    this.playerId = playerId;
    console.log(playerId);
    let url = this.getPlayGameUrl + playerId;
    this.http.get(url).subscribe(res => {
      let response = res.json();
      console.log(response);
      this.gameId = response.gameId;
      //this.getContacts(); 
      setInterval(()=> {this.getContacts()},500);
    });

    if(this.playerOrder === 1){
      this.char = 'X';
    }else {
      this.char = 'O';
    }
    console.log(playerId);
  }

}
