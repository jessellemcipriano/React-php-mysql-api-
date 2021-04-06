import React from 'react';


export default class Tabela extends React.Component{


    render(){
        return(
        <div>

            <table className="table" className="tabelaCursos">
                <thead>
                    <tr>
                        <td>Id</td>
                        <td>Nome do Curso</td>
                        <td>Descrição do Curso</td>
                        <td>Valor do Curso</td>

                    </tr>
                </thead>
                <tbody>
                    {this.props.arrayCursos.map(

                    row=>

                        <tr key={row.id}>
                        <td>{row.id}</td>
                        <td>{row.nome}</td>
                        <td>{row.descricao}</td>
                        <td>{row.valor}</td>
                        </tr>
                     )}
                </tbody>
            </table>


                        {this.props.arrayCursos.map(

                        row=>
                            <div className="col-3">
                            <ul key={row.id}>
                            <li>{row.id}</li>
                            <li>{row.nome}</li>
                            <li>{row.descricao}</li>
                            <li>{row.valor}</li>
                            </ul>

                            </div>
                            
                        )}
                        

             
        </div>
        );
    }
}