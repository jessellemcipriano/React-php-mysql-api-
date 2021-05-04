import React from 'react';

import Tabela from './Tabela';

import './App.css'

import LogoStream from "./logo-stream.png"
import LogoNav from "./logo-nav.png"
import Right from "./right.png"
import Left from "./left.png"






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
            <div className="bg2" >

                <div className="nav-menu">
                <div className= "col-4 logo"> <img className= "img-nav" src={LogoNav }/> </div>   
             
                    <ul><a class="nav-ul " href="#hero">Serviços</a></ul>
                    <ul><a class="nav-ul " href="#about">Conteúdo gratuito</a></ul>
                    <ul><a class="nav-ul" href="#services">Blog</a></ul>
               
                </div>
<br></br> <br></br>
                <div className="container">
                        <h3>Qual o melhor dia para nossa conversa inicial?</h3><br></br>
                        <div className="WhiteCard container">  
                            <h3>Fevereiro</h3>
                            <div className="row">
                                <div className="col-2 colSeta">
                                <img className="seta" src={Left }/>
                                </div> 
                                <div className="yellowCard container"> 
                                
                                <div className="row">
                                        <div className=" daycard">
                                            D
                                        </div>
                                        <div className=" daycard">
                                            S
                                        </div>
                                        <div className=" daycard">
                                            T
                                        </div>
                                        <div className=" daycard">
                                            Q
                                        </div>
                                        <div className=" daycard">
                                            Q
                                        </div>
                                        <div className=" daycard">
                                            S
                                        </div>
                                        <div className=" daycard">
                                            S
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className=" mincard-d">
                                            26
                                        </div>
                                        <div className=" mincard-d">
                                            27
                                        </div>
                                        <div className=" mincard-d">
                                            28
                                        </div>
                                        <div className=" mincard-d">
                                            29
                                        </div>
                                        <div className=" mincard-d">
                                            30
                                        </div>
                                        <div className=" mincard-d">
                                            31
                                        </div>
                                        <div className=" mincard">
                                            1
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className=" mincard">
                                            2
                                        </div>
                                        <div className=" mincard">
                                            3
                                        </div>
                                        <div className=" mincard">
                                            4
                                        </div>
                                        <div className=" mincard">
                                            5
                                        </div>
                                        <div className=" mincard">
                                            6
                                        </div>
                                        <div className=" mincard">
                                            7
                                        </div>
                                        <div className=" mincard">
                                            8
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className=" mincard">
                                            9
                                        </div>
                                        <div className=" mincard">
                                            10
                                        </div>
                                        <div className=" mincard">
                                            11
                                        </div>
                                        <div className=" mincard">
                                            12
                                        </div>
                                        <div className=" mincard">
                                            13
                                        </div>
                                        <div className=" mincard">
                                            14
                                        </div>
                                        <div className=" mincard">
                                        15
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className=" mincard">
                                            16
                                        </div>
                                        <div className=" mincard">
                                            17
                                        </div>
                                        <div className=" mincard">
                                            18
                                        </div>
                                        <div className=" mincard">
                                            19
                                        </div>
                                        <div className=" mincard">
                                            20
                                        </div>
                                        <div className=" mincard">
                                            21
                                        </div>
                                        <div className=" mincard">
                                            22
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className=" mincard">
                                            23
                                        </div>
                                        <div className=" mincard">
                                            24
                                        </div>
                                        <div className=" mincard">
                                            25
                                        </div>
                                        <div className=" mincard">
                                            26
                                        </div>
                                        <div className=" mincard">
                                            27
                                        </div>
                                        <div className=" mincard">
                                            28
                                        </div>
                                        <div className=" mincard">
                                            29
                                        </div>
                                    </div>
                                </div>
                                <div className="col-2 colSeta ">
                                <img className="seta" src={Right}/>
                                </div> 
                            </div>
                            <button className = "btnA">Agendar </button>
                        </div>
               </div> 
                <br></br>


                <div className="container">
                        <h3>Qual o melhor horário para nossa conversa inicial?</h3><br></br>
                        <div className="WhiteCard container">  
                            <h3>15 de fevereiro</h3>
                            <div className="row">
                                <div className="col-2 colSeta">
                                <img className="seta" src={Left }/>
                                </div> 
                                <div className="yellowCard time container">
                                    <h5 className="time" >Horários disponíveis</h5> 
                                    <div className="row">
                                        <div className=" mincard">
                                            07:00
                                        </div>
                                        <div className=" mincard">
                                            08:00
                                        </div>
                                        <div className=" mincard">
                                            09:00
                                        </div>
                                        <div className=" mincard">
                                            10:00
                                        </div>
                                        <div className=" mincard">
                                            11:00
                                        </div>
                                        
                                    </div>
                                    <div className="row">
                                        <div className=" mincard">
                                            12:00
                                        </div>
                                        <div className=" mincard">
                                            13:00
                                        </div>
                                        <div className=" mincard">
                                            14:00
                                        </div>
                                        <div className=" mincard">
                                            15:00
                                        </div>
                                        <div className=" mincard">
                                            16:00
                                        </div>
                                        
                                    </div>
                                    <div className="row">
                                        <div className=" mincard">
                                            17:00
                                        </div>
                                        <div className=" mincard">
                                            18:00
                                        </div>
                                        <div className=" mincard">
                                            19:00
                                        </div>
                                        
                                        
                                    </div>
                                    
                                </div>
                                <div className="col-2 colSeta">
                                
                                </div>
                            </div>
                            <button className = "btnA">Agendar </button>
                        </div>
               </div> 

               <div className="container">
                        <h3>Vamos confirmar o agendamento?</h3><br></br>
                        <div className="WhiteCard container">  
                            
                            <div className="row col-12 pcard">
                                <div className="col-6 confcard borderline">
                                <img className= "imgStream" src={LogoStream }/>
                                    <h4>Nossa Conversa inicial será dia</h4>
                                    <h3>15 de fevereiro às 08h.</h3>
                                    <h7> Escolher outra data</h7>
                                </div>
                                <div className="col-6 confcard">
                                    <h4><strong>Dados Pessoais</strong></h4><br></br>
                                    <input  className = "input inConf" placeholder = "Primerio Nome " value = {this.state.test} onChange = {(evt) => this.setFrase(evt.target.value)}/><br></br>
                                    <input  className = "input inConf" placeholder = "Ultimo sobrenome" value = {this.state.test} onChange = {(evt) => this.setFrase(evt.target.value)}/><br></br>
                                    <input  className = "input inConf" placeholder = "E-mail" value = {this.state.test} onChange = {(evt) => this.setFrase(evt.target.value)}/><br></br>
                                    <input  className = "input inConf" placeholder = "Telefone" value = {this.state.test} onChange = {(evt) => this.setFrase(evt.target.value)}/><br></br>
                            
                                </div>

                            </div>
                                
                             <button className = "btnC">Agendar </button>
                        </div>
               </div> 
              



               


                 
            </div>





        );
    }
}