import { Component, OnInit } from '@angular/core';
import { RecipeService } from 'src/app/services/recipe.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.sevice';
import { Recipe } from 'src/app/models/recipe.model';



@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {

  constructor(
    private manageRecipe: RecipeService,
    private currentRouteInfo: ActivatedRoute,
    private router: Router,
    public authService: AuthService
    ) { }
  recipes: Recipe[] = this.manageRecipe.recipe;

  ngOnInit() {
  }

  onNewRecipe() {
    this.router.navigate(['new'], {relativeTo: this.currentRouteInfo});
  }
}
