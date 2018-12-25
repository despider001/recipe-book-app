import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase/app';
import { DatabaseService } from './services/database.service';
import { RecipeService } from './services/recipe.service';
import { Recipe } from './models/recipe.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private databaseService: DatabaseService, private manageRecipe: RecipeService) {}
  ngOnInit() {
    const app = firebase.initializeApp({
      apiKey: 'AIzaSyAX0twAF-VhDYAuXGawGB7Fgin6HT3YJH4',
      authDomain: 'ng-recipebook-9de7c.firebaseapp.com'
    });
    // console.log(app);

    this.databaseService.getRecipe().subscribe(
      (recipes: Recipe[]) => {
        this.manageRecipe.recipe = recipes;
      }
    );
  }
}
