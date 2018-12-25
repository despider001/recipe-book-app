import { FormsModule } from '@angular/forms';
import { ShoppingListRouting } from './shopping-list-routing.module';
import { NgModule } from '@angular/core';
import { ShoppingListComponent } from './shopping-list.component';
import { ShoppingEditComponent } from './shopping-edit/shopping-edit.component';
import { SharedModule } from 'src/app/shared.module';

@NgModule({
    imports: [
        FormsModule,
        SharedModule,
        ShoppingListRouting
    ],
    declarations: [
        ShoppingListComponent,
        ShoppingEditComponent,
    ],
    exports: [],
})
export class ShoppingListModule {
}