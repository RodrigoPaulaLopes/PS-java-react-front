import { useState, useEffect } from "react";
import Table from "./Components/Table/Table";
import Form from "./Components/Form/Form";

import IResponse, { IParams, ITransfers } from "./Interfaces/Interfaces";
import "./App.css";
import request from "./API/request";
import { getParams } from "./Helpers/Params";

function App() {
  const [transfers, setTransfers] = useState<ITransfers[]>([]);
  const [numeroConta, setNumeroConta] = useState<string | undefined>(undefined);
  const [dataInicial, setDataInicial] = useState<string | undefined>(undefined);
  const [dataFinal, setDataFinal] = useState<string | undefined>(undefined);
  const [operadorTransacao, setOperadorTransacao] = useState<
  string | undefined
  >(undefined);
  const [size, setSize] = useState<number>(6);
  const [page, setPage] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);

  useEffect(() => {
    //colocando os parametros automaticamente para jogar com argumento da função getParams
    
    console.log(operadorTransacao);
    
    const dParams: IParams = {
      operadorTransacao: operadorTransacao,
      numeroConta: numeroConta,
      dataInicial: dataInicial,
      dataFinal: dataFinal,
      size: size,
      page: page,

    };

  

    //chamando a função getParams para colocar todas os parametros que não são undefined ou nullos
    const params: IParams = getParams(dParams);

    request
      .get("/transfers", { params: params })
      .then((res) => {
        const dados: IResponse = res.data as IResponse;
        setTotalPages(dados.totalPages)
        setTransfers(dados.content);
      })
      .catch(() => setTransfers([]));
  }, [size, page, totalPages, operadorTransacao, numeroConta, dataInicial, dataFinal]);

  return (
    <>

        <div className="container">
          <Form setNumeroConta={setNumeroConta} setOperadorTransacao={setOperadorTransacao} setDataInicial={setDataInicial} setDataFinal={setDataFinal} />
          <Table transfers={transfers} setSize={setSize} totalPages={totalPages} setPage={setPage} page={page}/>
        </div>
    </>
  );
}

export default App;
