import React, {Component} from 'react';

import './App.css'

import moment from 'moment'

import Cv from "./cv.png"
import LogoNav from "./logo-nav.png"
import Right from "./right.png"
import Left from "./left.png"
import Bg from "./bg.png"
import Logo from './logo.png'

import request from '../util/middleware'
import Calendar from 'react-calendar'



export default class App extends Component{
    
    constructor(props){
        super(props);

        this.state = {
            currentPage: 'date',
            date: "",
            day: "",
            hour: "",
            loading: false,
            hours: []

        };
    }

    getAppoitmentDate = () => {
        try {
            let date = new moment(this.state.date.toString())
            let dateHour = new moment(this.state.hour.time)
            
            let hour = moment(dateHour).hour()
            let minute = moment(dateHour).minute()
    
            let month = moment(date).month()
            date = moment(date).hour(hour).minute(minute).format('DD [de] [' + this.months[month] + '] à[s] HH:mm')
            return date.toString()
        } catch (ex) {
            return 'Erro'
        }
    }



    changeText = (value, index)=>{

        this.setState({
            [index]:value
        })
    }


    fetchAvailableDays = async () => {
        this.setState({
            loading:true
        })

        let resp = await request('GET', 'dias', '')
        
        if (resp.ok) {
            this.setState({
                availableDays: resp.data
            })
        } else {
            this.setState({
                erro: resp.data
            })
        }
    }


    fetchAvailableHours = async () => {

        this.setState({
            loading:true
        })
        console.log("OLHA A DATA ==> " + this.state.date.toString())

        let date = moment(this.state.date).format('YYYY-MM-DD')
        console.log("Estou mandando a seguinte data ==> " + date)
        let resp = await request('GET', 'horarios', date)
        
        if (resp.ok) {

            this.setState({
                hours: resp.data,
                loading: false
            })
        } else {
            this.setState({
                erro: resp.data,
                loading: false
            })
        }
    }

    handlePickDay = (d) => {

        let state = this.state

        state.date = d
        state.currentPage = 'hour'

        this.setState(state)
        
        // Chamada para API buscando as horas vagas
        this.fetchAvailableHours()
    }

    handlePickHour = (hour) => {
        this.setState({
            currentPage: 'appointment',
            hour: hour
        })
    }

    months = {
        1: "Janeiro",
        2: "Fevereiro",
        3: "Março",
        4: "Abril",
        5: "Maio",
        6: "Junho",
        7: "Julho",
        8: "Agosto",
        9: "Setembro",
        10: "Outubro",
        11: "Novembro",
        12: "Dezembro"
    }

    datePage = () => {
        return (
            <>
            <div>{this.state.availableDays}</div>
            {/* <div>{this.state.erro}</div> */}
            <div className="container ">
                    <div className="whiteCard">  
                    <br></br>
                    <h4>Qual o melhor dia para nossa conversa inicial?</h4>
                    <br></br>
                        <div className="yellowCard row">
                        <Calendar
                            locale = 'PT-BR'
                            
                            className = "calendar"
                            showNavigation = {true}
                            navigationLabel	= {(a) => <h3 className = "title">{this.months[a.date.getMonth()]}</h3>}
                            nextLabel = {<img className="seta" src={Right}/>}
                            // tileDisabled = {true}
                            prevLabel = {<img className="seta" src={Left}/>}
                            nextAriaLabel = {<div className = "invisible"/>}
                            prevAriaLabel = {<div className = "invisible"/>}
                            prev2AriaLabel = {<div className = "invisible"/>}
                            next2AriaLabel = {<div className = "invisible"/>}
                            next2Label = {<div className = "invisible"></div>}
                            prev2Label = {<div className = "invisible"/>}
                            
                            calendarType = 'ISO 8601'
                            showNeighboringMonth = {false}
                            onClickDay = {this.handlePickDay}
                            tileClassName = {() =>"mincard"}

                        />
                        </div>
                        <br></br>  
                    </div>
                    <img className="bg-img" src={Bg }/>  
               </div> 
                <br></br>
                </>
        )
    }

    getDay = () => {
        try {
            return this.state.date.getDate() + '/' +  this.state.date.getMonth()
        } catch (ex) {
            return "erro"
        }
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
                                        
                                        <h5 className="time" >Horários disponíveis dia {this.getDay()}</h5> 
                                        <div className="row just">
                                        {/* Mapeando as horas disponíveis */}
                                        { this.state.loading ?

                                            // Se está carregando
                                            <img className= "imagem App-logo" src={Logo}/> :

                                            this.state.erro ? 

                                            // Se deu erro no fetch
                                            <div>{this.state.erro}</div> :
                                            
                                            // Mapeando as horas
                                            // <div>{this.state.hours.toString()}</div> 
                                            this.state.hours.map(
                                            hour=> <button key = {JSON.stringify(hour)}  className = "mincard" onClick = {() => this.handlePickHour(hour)}>
                                                {moment(hour.time).format('H:mm')}
                                            </button>
                                            )
                                        }
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
                        
                            <div className="row col-12 pcard">
                                <h4 className = "col-12 d-flex justify-content-center">Vamos agendar nossa conversa?</h4>
                                <div className="col-6 confcard borderline">
                                <img className= "imgStream" src={Cv}/>
                                <br></br>
                                    <h6>Seu encontro com a Eurekka será dia</h6>
                                    <h6>{this.getAppoitmentDate()}</h6>
                                   
                                </div>
                                <div className="col-6 confcard">
                                    <h4><strong>Dados Pessoais</strong></h4><br></br>
                                    <input  className = "input inConf" placeholder = "Nome Completo" value = {this.state.test} onChange = {(evt) => this.changeText(evt.target.value, 'name')}/><br></br>
                                    <input  className = "input inConf" placeholder = "E-mail" value = {this.state.test} onChange = {(evt) => this.changeText(evt.target.value, 'email')}/><br></br>
                                    <input  className = "input inConf" placeholder = "Telefone" value = {this.state.test} onChange = {(evt) => this.changeText(evt.target.value, 'phone')}/><br></br>
                            
                                </div>
                                
                            <button onClick = {() => console.log(this.state)} className = "btnC">Agendar </button>
                            </div>
                                
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