import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { SignupComponent } from './signup/signup.component';
import { SigninComponent } from './signin/signin.component';
import { AuthRoutingModule } from './auth-routing.module';
import { SharedModule } from 'src/app/shared.module';
@NgModule({
    imports: [
        FormsModule,
        SharedModule,
        AuthRoutingModule
    ],
    exports: [],
    declarations: [
        SignupComponent,
        SigninComponent
    ],
})
export class AuthModule {}
