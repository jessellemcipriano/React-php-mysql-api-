import React from 'react';

import Tabela from './Tabela';

import './App.css'

import LogoEurekka from "./logo.png"
import LogoNav from "./logo-nav.png"






export default class App extends React.Component{
    
    constructor(){
        super();
        this.state=({ 
            db:[],
            frase:[], 
            logged:false

        });
        
        
    }


    SalvarFrase=()=> {
        const data = {
            "test" : this.state.test
          }
          const requestInf = {
              method: 'POST',
              body: JSON.stringify(data),
              headers: new Headers({
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                Authorization : `Bearer ${this.state.db} `
              }),
          }; 

        fetch("http://127.0.0.1:8000/api/test", requestInf)
    }




    
    RecuperarFrase=()=> {
        


        const requestInfo = {
            headers: new Headers({
              'Content-Type': 'application/json',
              'Accept': 'application/json',
              Authorization : `Bearer ${this.state.db} `
            }),
        }; 



        fetch("http://127.0.0.1:8000/api/resp", requestInfo).then((resp)=>resp.json())
        .then((respJson)=> { 
            console.log(JSON.stringify(respJson));  

            this.setState({ 
                
                frase:respJson[0].test
            });
            
            console.log(this.state.frase);   
            
        })
    }






    login=()=> {
        const data = {
            "email" : this.state.email,
            "password" : this.state.password,
          }
          const requestLogin = {
              method: 'POST',
              body: JSON.stringify(data),
              headers: new Headers({
                'Content-Type': 'application/json',
                'Accept': 'application/json',
               
              }),
          }; 

          fetch("http://127.0.0.1:8000/api/login", requestLogin).then((response)=>response.json())
          .then((responseJson)=> { 
              this.setState({ 
                  
                  db:responseJson.access_token, logged:true
              });
              
              console.log(this.state.db);
              
              
              
          })
    }

    setFrase=(value)=>{

        this.setState({
            test:value
        })
    }

    setEmail=(value)=>{

        this.setState({
            email:value
        })
    }

    setPassword=(value)=>{

        this.setState({
            password:value
        })
    }

    render(){


        return(
            <div className="bg" >
                <div className="nav-menu">
                <img className= "img-nav" src={LogoNav }/>
                </div>
                <div className="container">
                        <div className="blackCard container">  
                        <img className= "imagem App-logo" src={LogoEurekka }/>
                        {this.state.logged ? <h2 style={{color:'white'}}>Logado</h2>: <div className="alinhamento"><input className = "input in" placeholder = "E-mail" value = {this.state.email} onChange = {(evt) => this.setEmail(evt.target.value)}/><br></br>
                        <input type="password" className = "input in" placeholder = "Senha" value = {this.state.password} onChange = {(evt) => this.setPassword(evt.target.value)}/><br></br>
                        <button className = "btnE" onClick = {this.login}>Login </button></div> }
                        
                        </div>
               </div> 
                <br></br>

               <div className="container">
               <input  className = "input in" placeholder = "Frase" value = {this.state.test} onChange = {(evt) => this.setFrase(evt.target.value)}/><br></br>
               <button className="btn btn-primary" onClick = {this.SalvarFrase}> Enviar frase de teste </button><br></br>
               <button  className="btn btn-success" onClick = {this.RecuperarFrase}> Ler frase do bd </button><br></br>
               <div>Retorno do bd:{this.state.frase}</div>                
               </div>


                 
            </div>





        );
    }
}