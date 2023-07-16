export interface IConta {
    id: number;
    numero_conta: string;
    nome_responsavel: string;

}

export interface ITransfers {
  id: number;
  date: string;
  valor: number;
  tipo: string;
  nome_operador: string;
  conta: IConta
}
type TSort = {
    
    empty: boolean,
    sorted: boolean,
    unsorted: boolean
    
}
export interface IParams {
    numeroConta?: string
    dataInicial?: string
    dataFinal?: string
    operadorTransacao?: string
    page?: number
    size?: number,


}
interface TPageable  {
    sort: TSort,
    offset: number,
    pageNumber: number,
    pageSize: number,
    paged: boolean,
    unpaged: boolean
	
}
interface IResponse {
    content: ITransfers[],
	pageable: TPageable,
	last: boolean,
	totalElements: number,
	totalPages: number,
	size: number,
	number: number,
	sort: TSort,
	first: boolean,
	numberOfElements: number,
	empty: boolean
}
export default IResponse




