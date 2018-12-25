import { RecipeService } from './../../../services/recipe.service';

import { ActivatedRoute, Params, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  id: number;
  editMode = false;
  public recipeForm: FormGroup;
  constructor(private currentRouteInfo: ActivatedRoute, private manageRecipe: RecipeService, private router: Router) { }

  ngOnInit() {
    this.currentRouteInfo.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.editMode = params['id'] != null;
        this.initForm();
      }
    );
  }

  private initForm() {
    let recipeName = '';
    let recipeImagePath = '';
    let recipeDescription = '';
    const recipeIngredient = new FormArray([]);
    if (this.editMode) {
      const recipe = this.manageRecipe.getRecipeByIndex(this.id);
      recipeName = recipe.name;
      recipeImagePath = recipe.imagePath;
      recipeDescription = recipe.desc;
      if (recipe['ingredients']) {
        for (const item of recipe.ingredients) {
          recipeIngredient.push(new FormGroup({
            'name' : new FormControl(item.name, Validators.required),
            'amount': new FormControl(item.amount, [Validators.required, Validators.pattern(/^\d+$/)])
          }));
        }
      }

    }
    this.recipeForm = new FormGroup({
      'name': new FormControl(recipeName, Validators.required),
      'imagePath': new FormControl(recipeImagePath, Validators.required),
      'desc': new FormControl(recipeDescription, Validators.required),
      'ingredients': recipeIngredient
    });
  }

  onSubmit() {
    if (this.editMode) {
      this.manageRecipe.updateRecipe(this.id, this.recipeForm.value);
    } else {
      this.manageRecipe.addRecipe(this.recipeForm.value);
    }
    this.router.navigate(['../'], {relativeTo: this.currentRouteInfo});
  }

  onCancel() {
    this.router.navigate(['../'], {relativeTo: this.currentRouteInfo});
  }

  onAddIngredient() {
    (<FormArray>this.recipeForm.get('ingredients')).push(new FormGroup({
      'name' : new FormControl(null, Validators.required),
      'amount': new FormControl(null, [Validators.required, Validators.pattern(/^\d+$/)])
    }));
  }

  onDeleteIngredient(index: number) {
   (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }
  getControls() {
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }

}
