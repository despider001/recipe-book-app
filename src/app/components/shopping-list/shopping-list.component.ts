import { IngredientService } from './../../services/ingredient.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
  animations: [
    trigger('List', [
      state('in', style({
        'opacity': 1,
        'transform': 'translateX(0)'
      })),
      transition('void => *', [
        style({
          'opacity': 0,
          'transform': 'translateX(-50px)'
        }),
        animate(400),
      ]),
      transition('* => void', [
        animate(400),
          style({
            'opacity': 0,
            'transform': 'translateX(50px)'
          }),
      ])
    ])
  ]
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  private ingredientChangeSubscription$: Subscription;
  constructor(private manageIngredient: IngredientService, private router: Router) { }

  ingredients = this.manageIngredient.getIngredient();
  ngOnInit() {
   this.ingredientChangeSubscription$ = this.manageIngredient.ingredientChange.subscribe(
      (data) => {
        this.ingredients = data;
      }
    );
  }
  onEditItem(index: number) {
    this.manageIngredient.startedEditing.next(index);
  }
  ngOnDestroy() {
    this.ingredientChangeSubscription$.unsubscribe();
  }

  onDeleteIngredient(index: number) {
    this.manageIngredient.deleteIngredient(index);
    this.router.navigate(['/shopping']);
  }

}
