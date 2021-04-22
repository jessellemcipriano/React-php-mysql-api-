import React from 'react';


export default class Tabela extends React.Component{


    render(){
        return(
        <div>

            <table className="table" className="tabelaCursos">
                <thead>
                    <tr>
                        <td>Frase</td>
                        

                    </tr>
                </thead>
                <tbody>
                    {this.props.arrayCursos.map(

                    row=>

                        <tr key={row.id}>
                        <td>{row.test}</td>
                        
                        </tr>
                     )}
                </tbody>
            </table>


                    
                        

             
        </div>
        );
    }
}