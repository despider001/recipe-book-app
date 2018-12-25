import { Ingredient } from './ingredient.model';

export class Recipe {
  /**
   *
   * @param {string} name
   * @param {string} desc
   * @param {string} imagePath
   * @param {object[]} ingredients
   */
  constructor(public name: string, public desc: string, public imagePath: string, public ingredients: Ingredient[]) {}
}
