import { Ingrediente } from './../../ingrediente/modelos/ingrediente';

export interface Lanche {
  id?: number;
  nome?: String;
  ingredientes?: Ingrediente[];
  urlimagem?: any;
}
