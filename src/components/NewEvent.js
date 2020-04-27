import React, {Component} from 'react';
import ReactDOM from 'react-dom'
import './styles/review.css'
import './styles/newEvent.css'
import 'react-calendar/dist/Calendar.css';
import Calendar from 'react-calendar';
import Picker from '../../node_modules/pickerjs/dist/picker.js'
import '../../node_modules/pickerjs/dist/picker.css'


class NewEvent extends Component{
    constructor(){
        super();
        this.state = {
            date: new Date,
            formatDate: "",
            calenderStatus: false,
            horaStatus: false,
            inputsStatus: true,
            hour: "",
            timeError: "",
            hourError: ""
        };
        this.timeHour = React.createRef()
    }

    hanflePicker(refere){
        var picker = new Picker(refere, {
            controls: true,
            inline: true,
            format: "HH:mm",
            rows: 3,
            isInput: true
        });
    }

    componentDidMount(){

    }

    generadorCalender = () =>{
        if (this.state.calenderStatus) {
            return (
                <div className="d-flex">
                    <Calendar
                        onChange={this.onChange}
                        value={this.state.date}
                        className="centrar-calender"
                        showNeighboringMonth ={false}
                        next2Label = {undefined}   
                    />
                </div>
            )
        }
    }

    generadorHora = () =>{
        if (this.state.horaStatus) {
            return(
                <React.Fragment>
                    <input className="js-inline-picker" id="hourS" value="2048-10-24 05:12"></input>                        
                    <div className="hora-mili">24H</div>    
                </React.Fragment>
            )
        }
    }

    generadorInputs = () =>{
        if(this.state.inputsStatus){
            return(
                <div id="sepa">
                    <div className="d-flex flex-row">
                        <div className="texto-review header-comen sepa-iz me-eve">
                            ¿Cuando?
                        </div>
                    </div>
                    <div className="d-flex flex-row boton-sepa-iz">
                        <input onClick={this.handleClickDay} value={this.state.formatDate} className="boton-inside-evento" type="text" className="comentario" placeholder="Seleciones el día"></input>
                    </div>        
                    <div className="error-message mb-2 ml-5">{this.state.timeError}</div>            
                    <div className="d-flex flex-row boton-sepa-iz">
                        <input onMouseEnter={this.handleClickHour} on ref={this.timeHour} className="boton-inside-evento" type="text" className="comentario hora-ev" placeholder="Selecione la hora"></input>
                    </div> 
                    <div className="error-message mb-2 ml-5">{this.state.hourError}</div>
                    <div className="sepa-iz me-eve hora-input">Se os enviará un recordatorio a ambos un día y una hora antes del evento</div>
                    <div className="d-flex flex-row justify-content-center">
                        <button onClick={this.handleClickValorar} className="btn-valorar">Crear Evento</button>
                    </div> 
                </div>   
            )
        }
    }

    handleClickValorar = (e) => {
        e.preventDefault()
        const validate = this.validate()
        if (validate) {
            const date = this.state.formatDate
            const startTime = this.timeHour.current.value
            const finisthTime = this.finishTimeGene(startTime)
            let timezone = new Date()
            timezone = timezone.getTimezoneOffset();
            this.props.subEvent(date, startTime, finisthTime, timezone)
        }
    }

    finishTimeGene = (time) =>{
        let hora = time.split(":")
        let finishHora = parseInt(hora[0])
        finishHora += 1
        finishHora = finishHora.toString()
        if (finishHora == 24) {
            finishHora = 0
        }
        return (finishHora+":"+hora[1])
    }

    validate = () =>{
        const time = this.state.formatDate
        const hour = this.timeHour.current.value


        if (time == "") {
            this.setState({
                timeError: "La fecha no puede estar vacia"
            })
            return false
        }else{
            this.setState({
                timeError: ""
            })
        }

        if (hour == "") {
            this.setState({
                hourError: "La hora no puede estar vacia"
            })
        }else{
            this.setState({
                hourError: ""
            })
        }

        return true
    }

    handleClickHour = () =>{
        this.hanflePicker(this.timeHour.current)
    }

    handleClickDay = () =>{
        this.setState({
            inputsStatus: false,
            calenderStatus: true
        })
    }

    onChange = (date) => {
        this.setState({ 
            date,
            formatDate: this.formatDate(date),
            calenderStatus: false,
            inputsStatus: true
        })
    }

    formatDate = (date) => {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();
    
        if (month.length < 2) 
            month = '0' + month;
        if (day.length < 2) 
            day = '0' + day;
    
        return [year, month, day].join('-');
    }
    
    render(){ 
        return(
            <div className="d-flex fondo">
                <div className="flex-column carta" >
                    <div className="p-2 sin-padding">
                        <img src={require('../assets/img/image11.jpg')}></img>
                    </div>
                    <div className="p-2 card-style afuera bajar">
                        <div className="d-flex flex-row">
                            <div className="p-2 font-titulo header-evento sepa-iz">Nuevo evento</div>
                        </div>
                        {this.generadorCalender()}                                                                               
                        {this.generadorInputs()}              
                    </div>
                </div>
            </div>
        )
    }
}

export default NewEvent;