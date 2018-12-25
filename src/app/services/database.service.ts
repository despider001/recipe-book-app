import { AuthService } from './auth.sevice';
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
// tslint:disable-next-line:import-blacklist
import 'rxjs/Rx';
// tslint:disable-next-line:import-blacklist
import { Observable } from 'rxjs';
import { Recipe } from '../models/recipe.model';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class DatabaseService {
    constructor(private http: HttpClient, private authService: AuthService) {}
    token: string;
    saveRecipe(recipes: Recipe[]) {
        this.token = this.authService.getToken();
        if (this.token) {
            this.http.put(`https://ng-recipebook-9de7c.firebaseio.com/recipes.json`, recipes, {
                params: new HttpParams().set('auth', this.token)
            })
            .subscribe(
                (response) => {
                    console.log('Data saved!');
                },
                (err) => console.error(err)
            );
        } else {
            console.log('please login first');
        }
    }

    getRecipe() {
        return this.http.get<Recipe[]>(`https://ng-recipebook-9de7c.firebaseio.com/recipes.json`).map(
            (recipesData) => {
               const recipes: Recipe[] = [];
               for (const item of recipesData) {
                    if (item['ingredients']) {
                        recipes.push(item);
                    } else {
                        item['ingredients'] = [];
                        recipes.push(item);
                    }
               }
               return recipes;
            }
        ).catch((err) => {
            console.log(err);
            return Observable.throw(err);
        });
    }
}
