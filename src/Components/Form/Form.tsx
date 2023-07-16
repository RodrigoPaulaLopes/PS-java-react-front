import { Dispatch, SetStateAction, useState } from "react";
import { IParams } from "../../Interfaces/Interfaces";

interface IFormProps {
  setNumeroConta: Dispatch<SetStateAction<string | undefined>>;
  setOperadorTransacao: Dispatch<SetStateAction<string | undefined>>;
  setDataInicial: Dispatch<SetStateAction<string | undefined>>;
  setDataFinal: Dispatch<SetStateAction<string | undefined>>;
}
const initialValues: IParams = {
  dataFinal: undefined,
  dataInicial: undefined,
  numeroConta: undefined,
  operadorTransacao: undefined,
};
function Form({
  setNumeroConta,
  setOperadorTransacao,
  setDataFinal,
  setDataInicial,
}: IFormProps) {
  const [values, setValues] = useState<IParams>({
    dataFinal: undefined,
    dataInicial: undefined,
    numeroConta: undefined,
    operadorTransacao: undefined,
  });

  function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;

    setValues({ ...values, [name]: value });
  }

  function pesquisar(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setOperadorTransacao(values.operadorTransacao);
    setNumeroConta(values.numeroConta);
    setDataInicial(values.dataInicial);
    setDataFinal(values.dataFinal);
    
  }

  function limpar(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setOperadorTransacao(undefined);
    setNumeroConta(undefined);
    setDataInicial(undefined);
    setDataFinal(undefined);
    
    values.operadorTransacao = '';
    values.numeroConta = ''
    values.dataInicial = ''
    values.dataFinal = ''
  }
  return (
    <>
      <form action="" onSubmit={pesquisar} onReset={limpar}>
        <div className="row">
          <div className="mb-3 col-6">
            <label htmlFor="numeroConta" className="form-label">
              Numero da conta
            </label>
            <input
              type="text"
              className="form-control"
              name="numeroConta"
              id="numeroConta"
              value={values.numeroConta}
              onChange={onChange}
            />
          </div>
          <div className="mb-3 col-6">
            <label htmlFor="operadorTransacao" className="form-label">
              Nome operador transacionado
            </label>
            <input
              type="text"
              className="form-control"
              name="operadorTransacao"
              id="operadorTransacao"
              value={values.operadorTransacao}
              onChange={onChange}
            />
          </div>
          <div className="mb-3 col-6">
            <label htmlFor="dataInicial" className="form-label">
              Data de ínicio
            </label>
            <input
              type="date"
              className="form-control"
              name="dataInicial"
              id="dataInicial"
              value={values.dataInicial}
              onChange={onChange}
            />
          </div>
          <div className="mb-3 col-6">
            <label htmlFor="dataFinal" className="form-label">
              Data de fim
            </label>
            <input
              type="date"
              className="form-control"
              name="dataFinal"
              id="dataFinal"
              value={values.dataFinal}
              onChange={onChange}
            />
          </div>
         
          <div className="mb-3 col p-4">
            <input type="submit" value="Pesquisar" className="btn btn-primary"/>
            <input type="reset" value="Limpar" className="btn btn-outline-primary"/>
          </div>
        </div>
      </form>
    </>
  );
}
export default Form;
