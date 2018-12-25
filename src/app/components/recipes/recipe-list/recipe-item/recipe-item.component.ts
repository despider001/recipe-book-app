import { Recipe } from './../../../../models/recipe.model';
import { Component, OnInit, Input } from '@angular/core';
import { trigger, state, transition, style, animate, keyframes } from '@angular/animations';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css'],
  animations: [
    trigger('List', [
      state('in', style({
        'opacity': 1,
        'transform': 'translateY(0)'
      })),
      transition('void => *', animate(500, keyframes([
        style({
          'opacity': 0,
          'transform': 'translateY(-10px)',
           offset: 0
        }),
        style({
          'opacity': 0.4,
          'transform': 'translateY(-5px)',
           offset: 0.4
        }),
        style({
          'opacity': 0.8,
          'transform': 'translateY(0)',
           offset: 0.8
        }),
        style({
          'opacity': 1,
          'transform': 'translateY(0)',
           offset: 1
        }),
      ])))
    ])
  ]
})
export class RecipeItemComponent implements OnInit {
  @Input() recipe: Recipe;
  @Input() j: number;
  ngOnInit() {}

}
