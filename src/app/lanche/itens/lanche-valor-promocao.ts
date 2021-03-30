import { ValorPromocao } from './../../promocao/itens/valor-promocao';
import { Lanche } from './../modelos/lanche';
export interface LancheValorPromocao {
  lanche?: Lanche;
  valor?: number;
  promocoes?: ValorPromocao[];
  ingredientesLancheStr?: String;
}
