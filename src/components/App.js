import React from 'react';
import Tabela from './tabela';


export default class App extends React.Component{


    constructor(){
        super();
        this.state=({ 
            db:[]
        });
        this.exibirCursos();
        
    }

    
    exibirCursos(){

        fetch("http://localhost/api/" )
        .then((response)=>response.json())
        .then((responseJson)=> { 
            this.setState({
                
                db:responseJson
            });
            
            console.log(this.state.db);
            
            
        })
    }




    render(){
        return(
            <div>
               


               < Tabela arrayCursos={this.state.db} />
               
                 
                 hello
            </div>
        );
    }
}


