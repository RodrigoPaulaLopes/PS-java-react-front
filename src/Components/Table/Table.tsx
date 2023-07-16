import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { ITransfers } from "../../Interfaces/Interfaces";
import { changeClass } from "../../Helpers/activeClass";
import request from "../../API/request";
import IResponse from "../../Interfaces/Interfaces";
interface TableProps {
  transfers: ITransfers[];
  setSize: Dispatch<SetStateAction<number>>;
  totalPages: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  page: number;
}
export default function Table({
  transfers,
  setSize,
  totalPages,
  setPage,
  page,
}: TableProps) {
  const pages = Array.from({ length: totalPages }, (_, index) => index);
  const [saldoPeriodo, setSaldoPeriodo] = useState<number>(0);
  const [saldoTotal, setSaldoTotal] = useState<number>(0);
  const [totalTransfer, setTotalTransfer] = useState<ITransfers[]>([]);

  useEffect(() => {

    request
      .get("/transfers")
      .then((res) => {
        const dados: IResponse = res.data as IResponse;
        setTotalTransfer(dados.content);
      })
      .catch(() => setTotalTransfer([]));

    const soma1 = totalTransfer.reduce((total, item) => total + item.valor, 0);
    setSaldoTotal(soma1);

    const soma2= transfers.reduce((total, item) => total + item.valor, 0);
    setSaldoPeriodo(soma2);
    
  }, [totalTransfer, transfers]);

  function changePage(
    e: React.MouseEvent<HTMLInputElement, MouseEvent>,
    page: number
  ) {
    changeClass(e.target as EventTarget & HTMLInputElement, "active");
    setPage(page);
  }

  function next() {
    setPage(page + 1);
  }
  function previous() {
    setPage(page - 1);
  }

  return (
    <>
      <table className="table">
        <thead>
          <th>Saldo: {saldoTotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</th>
          <th>Saldo No Período: {saldoPeriodo.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</th>
          <th>
            <select
              name="size"
              className="form-select"
              id="size"
              onChange={(e) => setSize(Number(e.target.value))}
            >
              <option value="" selected></option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
            </select>
          </th>
        </thead>
        <thead>
          <th>Data</th>
          <th>Quantia</th>
          <th>Tipo</th>
          <th>Operador</th>
        </thead>
        <tbody>
          {transfers.map((transfer) => (
            <tr key={transfer.id}>
              <td>{transfer.date.split("-").reverse().join("/")}</td>
              <td>{transfer.valor}</td>
              <td>{transfer.tipo}</td>
              <td>{transfer.nome_operador}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <nav aria-label="Page navigation example">
            <ul className="pagination ustify-content-center">
              <li className="page-item">
                <a className="page-link " href="#" onClick={previous}>
                  Anterior
                </a>
              </li>
              {pages.map((page) => (
                <li className="page-item">
                  <input type="button"
                    className="page-link"
                    value={page + 1}
                    onClick={(e) => changePage(e, page) }
                  />
                    
                
                </li>
              ))}

              <li className="page-item">
                <a className="page-link" href="#" onClick={next}>
                  Proximo
                </a>
              </li>
            </ul>
          </nav>
        </tfoot>
      </table>
    </>
  );
}
