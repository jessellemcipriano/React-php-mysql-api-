import React from 'react';

import './App.css'

import moment from 'moment'

import Cv from "./cv.png"
import LogoNav from "./logo-nav.png"
import Right from "./right.png"
import Left from "./left.png"
import Bg from "./bg.png"
import Ci from "./CI.png"
import Ci2 from "./CI2.png"
import Ci3 from "./CI3.png"

import Calendar from 'react-calendar'



export default class App extends React.Component{
    
    constructor(){
        super();
        this.state=({
            currentPage: 'date',
            db:[],
            frase:[], 
            logged:false,
            date: "",
            day: "",
            hour: "",
            loading: false,
            hours: []

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


    getAppoitmentDate = () => {
        try {
    
            let date = new moment(this.state.date.toString())
            let [hour, minute] = this.state.hour.split(':')
            date = moment(date).hour(hour).minute(minute)
            return date.toString()
        } catch (ex) {
            return 'Erro'
        }
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

    changeText = (value, index)=>{

        this.setState({
            [index]:value
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


    fetchAvailableHours = async () => {
        // Simulando Chamada para API
        this.setState({
            loading:true
        })
        await new Promise(resolve => setTimeout(() => resolve(true), 300))
        this.setState({
            hours: ['10:00','12:00', '13:00', '15:00', '16:00', '20:00', '20:00', '20:00', '20:00', '20:00', '20:00', '20:00'],
            loading: false
        })
    }

    handlePickDay = (date) => {
        this.setState({
            currentPage: 'hour',
            date: date
        })

        // Chamada para API buscando as horas vagas
        this.fetchAvailableHours()
    }

    handlePickCI1 = () => {
        this.setState({
            currentPage: 'CI1',
            
        })
    }

    handlePickCI2 = () => {
        this.setState({
            currentPage: 'CI2',
            
        })
    }

    handlePickCI3 = () => {
        this.setState({
            currentPage: 'CI3',
            
        })
    }

    handlePickCI4 = () => {
        this.setState({
            currentPage: 'CI4',
            
        })
    }

    handlePickCI5 = () => {
        this.setState({
            currentPage: 'CI5',
            
        })
    }

    handlePickCI6 = () => {
        this.setState({
            currentPage: 'CI6',
            
        })
    }

    handlePickCI7 = () => {
        this.setState({
            currentPage: 'CI7',
            
        })
    }

    handlePickHour = (hour) => {
        this.setState({
            currentPage: 'appointment',
            hour: hour
        })
    }

    datePage = () => {
        return (
            <>
            <div className="container ">
               
                            <div className="whiteCard">  
                            <br></br>
                            <h4>Qual o melhor dia para nossa conversa inicial?</h4>
                            <br></br>
                                <div className="row just">
                                 <div className="col-2 colSeta">
                                <img className="seta" src={Left }/>
                                </div> 
                                <div className="yellowCard row">
                                <h3 className="col-12 d-flex justify-content-center">Abril</h3>
                                <Calendar
                                    locale = 'PT-BR'
                                    
                                    className = "calendar"
                                    showNavigation = {false}
                                    calendarType = 'ISO 8601'
                                    showNeighboringMonth = {false}
                                    onClickDay = {this.handlePickDay}
                                    tileClassName = {() =>"mincard"}

                                />
                                </div> 
                                 <div className="col-2 colSeta">
                                <img className="seta" src={Right}/>
                                </div> 
                                </div>
                                <br></br>  
                            </div>
                            <img className="bg-img" src={Bg }/>  
               </div> 
                <br></br>
                </>
        )
    }

    hourPage = () => {
        return (
        <div className="container">
            
                        
                            <div className="whiteCard"> 
                            <br></br> 
                            <h4>Qual o melhor horário para nossa conversa inicial?</h4>
                            <br></br>
                                    
                                    <div className="row">
                                                <div className="col-2 colSeta">
                                                <img className="seta" src={Left }/>
                                                </div> 
                                                <div className="yellowCard time container">
                                                        
                                                        <h5 className="time" >Horários disponíveis dia {this.state.date.getDate()}/0{this.state.date.getMonth()}</h5> 
                                                        <div className="row just">
                                                        {/* Mapeando as horas disponíveis */}
                                                        { this.state.loading ?<div >Carregando</div> : this.state.hours.map(
                                                            hour => <button className = "mincard" onClick = {() => this.handlePickHour(hour)}>
                                                                {hour}
                                                            </button>
                                                        )}
                                                        </div>
                                                </div>
                                                <div className="col-2 colSeta">
                                                
                                                </div>
                                    </div>
                                    
                            </div>
                            <img className="bg-img" src={Bg }/>  
        </div> )
    }

    appointmentPage = () => {
        return (<div className="container">
        
                        <div className="whiteCard container">  
                        <br></br>
                        <h4>Vamos agendar nossa conversa?</h4>
                        
                            
                            <div className="row col-12 pcard">
                                <div className="col-6 confcard borderline">
                                <img className= "imgStream" src={Cv}/>
                                <br></br>
                                    <h6>Seu encontro com a Eurekka será dia</h6>
                                    <h6>20 de Abril, às 16h.</h6>
                                   
                                </div>
                                <div className="col-6 confcard">
                                    <h4><strong>Dados Pessoais</strong></h4><br></br>
                                    <input  className = "input inConf" placeholder = "Primeiro Nome " value = {this.state.test} onChange = {(evt) => this.changeText(evt.target.value, 'firstName')}/><br></br>
                                    <input  className = "input inConf" placeholder = "Último Sobrenome" value = {this.state.test} onChange = {(evt) => this.changeText(evt.target.value, 'lastName')}/><br></br>
                                    <input  className = "input inConf" placeholder = "E-mail" value = {this.state.test} onChange = {(evt) => this.changeText(evt.target.value, 'email')}/><br></br>
                                    <input  className = "input inConf" placeholder = "Telefone" value = {this.state.test} onChange = {(evt) => this.changeText(evt.target.value, 'phone')}/><br></br>
                            
                                </div>
                                
                            </div>
                                
                            <button onClick = {() => this.handlePickCI1()} className = "btnC">Agendar </button>
                    </div>
               </div>) 
    }

    Ci1Page = () => {
        return (<div className="container">
        
                        <div className="whiteCard container">  
                        <br></br>
                        <h4>Vamos confirmar seus dados pessoais?</h4>
                        <h7>Lembre-se, os dados devem ser do paciente!</h7>
                        
                            
                            <div className="row col-12 dualCard  pcard">
                                <div className="col-6 confcard borderline">
                                <img className= "imgCi" src={Ci}/>
                                <br></br>
                                    
                                   
                                </div>
                                <div className="col-6 dualCard confcard">
                                    <input  className = "input inConf" placeholder = "Jéssellem Santos Cipriano" value = {this.state.test} onChange = {(evt) => this.changeText(evt.target.value, 'firstName')}/><br></br>  
                                    <input  className = "input inConf" placeholder = "Jéssellem_cipriano@hotmail.com" value = {this.state.test} onChange = {(evt) => this.changeText(evt.target.value, 'email')}/><br></br>
                                    <input  className = "input inConf" placeholder = "(27) 997632573" value = {this.state.test} onChange = {(evt) => this.changeText(evt.target.value, 'phone')}/><br></br>
                                    <input  className = "input inConf" placeholder = "14*.***.***-27" value = {this.state.test} onChange = {(evt) => this.changeText(evt.target.value, 'CPF')}/><br></br>
                                </div>
                                
                            </div>
                                
                            <button onClick = {() => this.handlePickCI2()} className = "btnC">Confirmar </button>
                    </div>
               </div>) 
    }

    Ci2Page = () => {
        return (<div className="container">
        
                        <div className="whiteCard container">  
                        <br></br>
                        
                        <h4>Este é seu endereço atual?</h4>
                        
                            
                            <div className="row col-12 dualCard pcard">
                                <div className="col-6 confcard borderline">
                                <img className= "imgCi" src={Ci}/>
                                <br></br>
                                    
                                   
                                </div>
                                <div className="col-6 dualCard confcard">
                                    <input  className = "input inConf" placeholder = "CEP: 29904-340" value = {this.state.test} onChange = {(evt) => this.changeText(evt.target.value, 'firstName')}/><br></br>  
                                    <input  className = "input inConf" placeholder = "Endereço: Rua dos jasmins, 372 " value = {this.state.test} onChange = {(evt) => this.changeText(evt.target.value, 'email')}/><br></br>
                                    <input  className = "input inConf" placeholder = "Bairro: Jardim Laguna" value = {this.state.test} onChange = {(evt) => this.changeText(evt.target.value, 'phone')}/><br></br>
                                    <input  className = "input inConf" placeholder = "Cidade: Linhares" value = {this.state.test} onChange = {(evt) => this.changeText(evt.target.value, 'phone')}/><br></br>
                                    <input  className = "input inConf" placeholder = "Estado: Espiríto Santo" value = {this.state.test} onChange = {(evt) => this.changeText(evt.target.value, 'phone')}/><br></br>
                                   
                                </div>
                                
                            </div>
                                
                            <button onClick = {() => this.handlePickCI3()} className = "btnC">Confirmar </button>
                    </div>
               </div>) 
    }


    Ci3Page = () => {
        return (<div className="container">
        
                        <div className="whiteCard container">  
                        <br></br>
                        
                        <h4>Só precisamos de mais algumas informações...</h4>
                        
                            
                            <div className="row col-12 dualCard pcard">
                                <div className="col-6 confcard borderline">
                                <img className= "imgCi" src={Ci}/>
                                <br></br>
                                    
                                   
                                </div>
                                <div className="col-6 dualCard confcard">
                                    <input  className = "input inConf" placeholder = "Cidade e estado que nasceu" value = {this.state.test} onChange = {(evt) => this.changeText(evt.target.value, 'firstName')}/><br></br>  
                                    <input  className = "input inConf" placeholder = "Estado Civil" value = {this.state.test} onChange = {(evt) => this.changeText(evt.target.value, 'email')}/><br></br>
                                    <input  className = "input inConf" placeholder = "Profissão/ocupação" value = {this.state.test} onChange = {(evt) => this.changeText(evt.target.value, 'phone')}/><br></br>
                                    
                                </div>
                                
                            </div>
                                
                            <button onClick = {() => this.handlePickCI4()} className = "btnC">Confirmar </button>
                    </div>
               </div>) 
    }


    Ci4Page = () => {
        return (<div className="container">
        
                        <div className="whiteCard container">  
                        <br></br>
                        
                        <h4>Precisamos de um contato de confiança...</h4>
                        <h7>Fique tranquilo, entraremos em contato apenas em situações de risco à sua vida.</h7>
                        
                            
                            <div className="row col-12 pcard">
                                <div className="col-6 confcard borderline">
                                <img className= "imgCi" src={Ci2}/>
                                <br></br>
                                    
                                   
                                </div>
                                <div className="col-6 confcard">
                                    <input  className = "input inConf" placeholder = "Nome" value = {this.state.test} onChange = {(evt) => this.changeText(evt.target.value, 'firstName')}/><br></br>  
                                    <input  className = "input inConf" placeholder = "Qual sua relação? (mãe, pai, amigo, colega...) " value = {this.state.test} onChange = {(evt) => this.changeText(evt.target.value, 'email')}/><br></br>
                                    <input  className = "input inConf" placeholder = "Telefone para contato " value = {this.state.test} onChange = {(evt) => this.changeText(evt.target.value, 'email')}/><br></br>
                                </div>
                                
                            </div>
                                
                            <button onClick = {() => this.handlePickCI5()} className = "btnC">Confirmar </button>
                    </div>
               </div>) 
    }

    Ci5Page = () => {
        return (<div className="container">
        
                        <div className="whiteCard container">  
                        <br></br>
                        
                        <h4>Qual sua relação com a terapia?</h4>
                        
                            
                            <div className="row col-12 pcard">
                                <div className="col-6 confcard borderline">
                                <img className= "imgCi" src={Ci3}/>
                                <br></br>
                                    
                                   
                                </div>
                                <div className="col-6 confcard">
                                    <h7>Atualmente, você faz acompanhamento psiquiátrico?</h7>
                                    <input  className = "input inConf" placeholder = "Colocar caixa de sim ou não" value = {this.state.test} onChange = {(evt) => this.changeText(evt.target.value, 'firstName')}/><br></br>  
                                    <input  className = "input inConf" placeholder = "Qual o nome do profissional? " value = {this.state.test} onChange = {(evt) => this.changeText(evt.target.value, 'email')}/><br></br>
                                    <input  className = "input inConf" placeholder = "Qual o telefone para contato do profissional?" value = {this.state.test} onChange = {(evt) => this.changeText(evt.target.value, 'phone')}/><br></br>
                                   <h7>Você tem algum comentário, ou dúvida, que queira nos dizer?</h7>
                                    <input  className = "input inConf" placeholder = "Digite aqui" value = {this.state.test} onChange = {(evt) => this.changeText(evt.target.value, 'phone')}/><br></br>
                                    
                                   
                                </div>
                                
                            </div>
                                
                            <button onClick = {() => this.handlePickCI6()} className = "btnC">Confirmar </button>
                    </div>
               </div>) 
    }

    Ci6Page = () => {
        return (<div className="container">
        
                        <div className="whiteCard container">  
                        <br></br>
                        
                        <h4>Como você conheceu a Eurekka?</h4>
                        
                            
                            <div className="row col-12 pcard">
                                <div className="col-6 confcard borderline">
                                <img className= "imgCi" src={Ci3}/>
                                <br></br>
                                    
                                   
                                </div>
                                <div className="col-6 confcard">
                                    <h7>Como conheceu a Eurekka terapia?</h7>
                                    <input  className = "input inConf" placeholder = "Colocar caixa de opçoes" value = {this.state.test} onChange = {(evt) => this.changeText(evt.target.value, 'firstName')}/><br></br>  
                                    <h7>Se conheceu a Eurekka por outro meio ou por indicação, nos conte um pouco sobre:</h7>
                                    <input  className = "input inConf" placeholder = " " value = {this.state.test} onChange = {(evt) => this.changeText(evt.target.value, 'email')}/><br></br>
                                    <h7>Se conheceu a Eurekka por indicação, qual o nome de quem te indicou?</h7>
                                    <input  className = "input inConf" placeholder = "" value = {this.state.test} onChange = {(evt) => this.changeText(evt.target.value, 'phone')}/><br></br>
                                    
                                   
                                </div>
                                
                            </div>
                                
                            <button onClick = {() => this.handlePickCI7()} className = "btnC">Confirmar </button>
                    </div>
               </div>) 
    }

    Ci7Page = () => {
        return (<div className="container">
        
                        <div className="whiteCard container">  
                        <br></br>
                        
                        <h4>Pagina de obrigado</h4>
                        
                            
                            <div className="row col-12 pcard">
                                <div className="col-6 confcard borderline">
                                <img className= "imgCi" src={Ci3}/>
                                <br></br>
                                    
                                   
                                </div>
                                <div className="col-6 confcard">
                                   Texto de obrigado
                                   
                                </div>
                                
                            </div>
                                
                            <button onClick = {() => this.handlePickCI7()} className = "btnC">Confirmar </button>
                    </div>
               </div>) 
    }



    pages = {
        'date': this.datePage,
        'hour': this.hourPage,
        'appointment': this.appointmentPage,
        'CI1' : this.Ci1Page,
        'CI2' : this.Ci2Page,
        'CI3' : this.Ci3Page,
        'CI4' : this.Ci4Page,
        'CI5' : this.Ci5Page,
        'CI6' : this.Ci6Page,
        'CI7' : this.Ci7Page,
        
    }

    render(){

        console.log(this.pages)
        return(
            <div className="bg2" >

                <div className="nav-menu">
                <div className= "col-4 logo"> <img className= "img-nav" src={LogoNav }/> </div>   
                <ul>
                    <li><a class="nav-ul " href="#hero">Serviços</a></li>
                    <li><a class="nav-ul " href="#about">Conteúdo gratuito</a></li>
                    <li><a class="nav-ul" href="#services">Blog</a></li>
                    </ul>
                </div>

                
                {this.pages[this.state.currentPage]()}
                 
            </div>
        );
    }
}