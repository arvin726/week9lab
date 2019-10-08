import { Component, OnInit } from "@angular/core";
import { DatabaseService } from "../database.service";
@Component({
  selector: "app-actor",
  templateUrl: "./actor.component.html",
  styleUrls: ["./actor.component.css"],
})
export class ActorComponent implements OnInit {
  actorsDB: any[] = [];
  moviesDB: any[] = [];
  mactorsDB: any[] = [];
  section = 1;
  fullName: string = "";
  bYear: number = 0;
  actorId: string = "";
  movieId: string = "";
  title: string = "";
  year: number = 0;
  ayear: number = 0;
  constructor(private dbService: DatabaseService) {}
  //Get all Actors
  onGetActors() {
    this.dbService.getActors().subscribe((data: any[]) => {
      this.actorsDB = data;
      this.onGetmActors();
    });
  }
  onGetMovies() {
    this.dbService.getMovies().subscribe((data: any[]) => {
      this.moviesDB = data;
    });
  }
 
  onGetmActors(){
    for(let i=0; i<this.actorsDB.length;i++){
      console.log(this.actorsDB[i].movies)
      if(this.actorsDB[i].movies.length >= 2){
        this.mactorsDB.push(this.actorsDB[i])
      }
    }
    console.log(this.mactorsDB)
  }

  //Create a new Actor, POST request
  onSaveActor() {
    let obj = { name: this.fullName, bYear: this.bYear };
    this.dbService.createActor(obj).subscribe(result => {
      this.onGetActors();
    });
  }
  onSaveMovie() {
    let obj = { title: this.title, year: this.year };
    console.log(obj)
    this.dbService.createMovie(obj).subscribe(result => {
      console.log('result',result)
      this.onGetMovies();
    });
  }
  // Update an Actor
  onSelectUpdate(item) {
    this.fullName = item.name;
    this.bYear = item.bYear;
    this.actorId = item._id;
  }
  onSelectUpdate2(item) {
    this.title = item.title;
    this.year = item.year;
    this.movieId = item._id;
  }
  onUpdateActor() {
    let obj = { name: this.fullName, bYear: this.bYear};
    this.dbService.updateActor(this.actorId, obj).subscribe(result => {
      this.onGetActors();
    });
  }
  onAddActor(){
    let obj ={ name: this.fullName, bYear: this.bYear, id:this.actorId }
    this.dbService.AddActor(this.movieId,obj).subscribe(result => {
      this.onGetMovies();
    });
  };
  //Delete Actor
  onDeleteActor(item) {
    this.dbService.deleteActor(item._id).subscribe(result => {
      this.onGetActors();
    });
  }
  onDeleteMovie(item) {
    this.dbService.deleteMovie(item._id).subscribe(result => {
      this.onGetMovies();
    });
  }
  onDeleteMoviesyear(){
    let ayear=this.ayear;
    console.log(ayear);
    this.dbService.deleteMoviesyear(ayear).subscribe(result => {
      this.onGetMovies();
    });
  };
  // This lifecycle callback function will be invoked with the component get initialized by Angular.
  ngOnInit() {
    this.onGetActors();
    this.onGetMovies();

  }
  changeSection(sectionId) {
    this.section = sectionId;
    this.resetValues();
  }
  resetValues() {
    this.fullName = "";
    this.title = "";
    this.bYear = 0;
    this.year = 0;
    this.actorId = "";
    this.movieId = "";
    this.ayear = 0;
  }
}