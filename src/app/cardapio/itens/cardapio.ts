import { LancheValorPromocao } from '../../lanche/itens/lanche-valor-promocao';

export interface Cardapio {
  lanches?: LancheValorPromocao[];
	dataHoraProcessamento?: String;
}
