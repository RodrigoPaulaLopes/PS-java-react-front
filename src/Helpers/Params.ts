import { IParams } from "../Interfaces/Interfaces";

export function getParams(dados: IParams) {
  const params: IParams = {};

  if (dados.numeroConta != undefined || params.numeroConta != null)
    params.numeroConta = dados.numeroConta;
  if (dados.dataInicial != undefined || params.dataInicial != null)
    params.dataInicial = dados.dataInicial;
  if (dados.dataFinal != undefined || params.dataFinal != null)
    params.dataFinal = dados.dataFinal;
  if (dados.operadorTransacao != undefined || params.operadorTransacao != null)
    params.operadorTransacao = dados.operadorTransacao;
  if (dados.size != undefined || params.size != null)
    params.size = dados.size;
  if (dados.page != undefined || params.page != null)
    params.page = dados.page;


  return params;
}
