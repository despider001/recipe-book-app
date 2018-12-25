import { Component, OnInit } from '@angular/core';
import { DatabaseService } from 'src/app/services/database.service';
import { RecipeService } from 'src/app/services/recipe.service';
import { Recipe } from 'src/app/models/recipe.model';


@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit {

  constructor(private databaseService: DatabaseService, private manageRecipe: RecipeService) { }

  ngOnInit() {
    // this.databaseService.getRecipe().subscribe(
    //   (recipes: Recipe[]) => {
    //     this.manageRecipe.recipe = recipes;
    //   }
    // );
  }

}
