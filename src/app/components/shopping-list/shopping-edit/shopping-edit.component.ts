import { IngredientService } from './../../../services/ingredient.service';
import { Subscription } from 'rxjs';
import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Ingredient } from 'src/app/models/ingredient.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  private startedEditingSubscription$: Subscription;
  @ViewChild('f') slForm: NgForm;
  public editMode = false;
  private editIndex: number;
  private editedItem: Ingredient;
  constructor(private manageIngredient: IngredientService) { }

  ngOnInit() {
   this.startedEditingSubscription$ = this.manageIngredient.startedEditing.subscribe(
     (index: number) => {
       this.editMode = true;
       this.editIndex = index;
       this.editedItem = this.manageIngredient.getIngredientByIndex(index);
       this.slForm.setValue({
         name: this.editedItem.name,
         amount: this.editedItem.amount
       });
     }
   );
  }

  ngOnDestroy() {
    this.startedEditingSubscription$.unsubscribe();
  }

  onSubmit(formData: NgForm) {
    const name = formData.value.name;
    const amount = formData.value.amount;
    const newIngredient = new Ingredient(name, amount);
    if (this.editMode) {
      this.manageIngredient.updateIngredient(this.editIndex, newIngredient);
    } else {
      this.manageIngredient.addIngredient(newIngredient);
    }
    this.onReset();
  }

  onReset() {
    this.editMode = false;
    this.slForm.reset();
  }

  onDelete() {
    this.manageIngredient.deleteIngredient(this.editIndex);
    this.onReset();
  }

}
