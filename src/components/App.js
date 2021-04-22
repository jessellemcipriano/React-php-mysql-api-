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

        fetch("http://127.0.0.1:8000/api/resp", {
            method: 'GET',
            headers: new Headers({
              Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC8xMjcuMC4wLjE6ODAwMFwvYXBpXC9sb2dpbiIsImlhdCI6MTYxOTA1NzY2MywiZXhwIjoxNjE5MDYxMjYzLCJuYmYiOjE2MTkwNTc2NjMsImp0aSI6IkN5czhGR1hSNmIyMHNHQWsiLCJzdWIiOjIsInBydiI6IjIzYmQ1Yzg5NDlmNjAwYWRiMzllNzAxYzQwMDg3MmRiN2E1OTc2ZjcifQ.Db_dzp2Fv8Mz3Fh4qooLcY5qZXI_FAxpEv3BwS3OpLc`,
            }),
          })
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


