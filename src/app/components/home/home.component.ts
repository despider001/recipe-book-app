import { Component, OnInit } from '@angular/core';
import { DatabaseService } from 'src/app/services/database.service';
import { RecipeService } from 'src/app/services/recipe.service';
import { trigger, state, style, transition, keyframes, animate } from '@angular/animations';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [
    trigger('slideDown', [
      state('in', style({
        'opacity': 1,
        'transform': 'translateY(0)'
      })),
      transition('void => *', animate(1500, keyframes([
        style({
          'opacity': 0,
          'transform': 'translateY(-15px)',
           offset: 0
        }),
        style({
          'opacity': 0.5,
          'transform': 'translateY(0)',
           offset: 0.5
        }),
        style({
          'opacity': 1,
          'transform': 'translateY(0)',
           offset: 1
        }),
      ])))
    ]),
    trigger('opacity', [
      state('visible', style({
        'opacity': 1
      })),
      transition('void => *',  animate(1000, keyframes([
        style({
          'opacity': 0,
           offset: 0
        }),
        style({
          'opacity': 1,
           offset: 1
        }),
      ])))
    ])
  ]
})
export class HomeComponent implements OnInit {

  constructor(private databaseService: DatabaseService, private manageRecipe: RecipeService) { }

  ngOnInit() {
    // this.databaseService.getRecipe().subscribe(
    //   (recipes: Recipe[]) => {
    //     this.manageRecipe.recipe = recipes;
    //   }
    // );
  }

}
