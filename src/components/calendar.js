import React from 'react';

import './App.css'

import moment from 'moment'

import Cv from "./cv.png"
import LogoNav from "./logo-nav.png"
import Right from "./right.png"
import Left from "./left.png"
import Bg from "./bg.png"


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
                                
                            <button onClick = {() => console.log(this.state)} className = "btnC">Agendar </button>
                    </div>
               </div>) 
    }

    pages = {
        'date': this.datePage,
        'hour': this.hourPage,
        'appointment': this.appointmentPage
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