
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Recipe } from 'src/app/models/recipe.model';
import { RecipeService } from 'src/app/services/recipe.service';
import { IngredientService } from 'src/app/services/ingredient.service';
import { AuthService } from 'src/app/services/auth.sevice';
import { Ingredient } from 'src/app/models/ingredient.model';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipeData: Recipe;
  recipeId: number;
  constructor(
    private manageRecipe: RecipeService,
    private manageIngredient: IngredientService,
    private currentRouteInfo: ActivatedRoute,
    private router: Router,
    public authService: AuthService
    ) { }

  ngOnInit() {
    // this.recipeId = +this.currentRouteInfo.snapshot.params['id'];
    // this.recipeData = this.manageRecipe.getRecipeByIndex(this.recipeId);
    this.currentRouteInfo.params.subscribe(
      (params: Params) => {
        this.recipeId = +params['id'];
        this.recipeData = this.manageRecipe.getRecipeByIndex(this.recipeId);
      }
    );

  }

  addToShoppingList(newIngredient: Ingredient[]) {
    newIngredient.forEach((item) => {
      this.manageIngredient.addIngredient(item);
    });
    this.router.navigate(['/shopping']);
  }

  onEdit() {
    this.router.navigate(['edit'], {relativeTo: this.currentRouteInfo});
  }
  onDelete() {
    this.manageRecipe.deleteRecipe(this.recipeId);
    this.router.navigate(['../'], {relativeTo: this.currentRouteInfo});
  }

}
