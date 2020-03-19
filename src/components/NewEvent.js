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
            date: new Date()
        };
        this.timeHour = React.createRef()
        
    }

    // hanflePicker(refere){
    //     var picker = new Picker(refere, {
    //         controls: true,
    //         inline: true,
    //     });
    // }

    componentDidMount(){
        console.log(this.timeHour.current)
        var picker = new Picker(this.timeHour.current, {
         controls: false,
         inline: true,
         format: "HH:mm",
         rows: 3,
     });
    }

    onChange = date => this.setState({ date })
    
    render(){ 

        return(
            <div className="d-flex fondo">
                <div className="flex-column carta" >
                    <div className="p-2 sin-padding">
                        <img src={require('../assets/img/image11.jpg')}></img>
                    </div>
                    <form className="p-2 card-style afuera bajar">
                        <div className="d-flex flex-row">
                            <div className="p-2 font-titulo header-evento sepa-iz">Nuevo evento</div>
                        </div>

                        
                            <div className="js-inline-picker" id="hourS" ref={this.timeHour}>2048-10-24 05:12</div>                        
                            <div className="hora-mili">24H</div>
                        
                        
                        
                        {/* <div className="d-flex">
                            <Calendar
                                onChange={this.onChange}
                                value={this.state.date}
                                 className="centrar-calender"
                                 showNeighboringMonth ={false}
                                 next2Label = {undefined}   
                            />
                        </div> */}

                        {/* Datos normales */}

                        {/* <div id="sepa">
                            <div className="d-flex flex-row">
                                <div className="texto-review header-comen sepa-iz me-eve">
                                    ¿Cuando?
                                </div>
                            </div>
                            <div className="d-flex flex-row boton-sepa-iz">
                                <input className="boton-inside-evento" type="text" className="comentario" placeholder="Seleciones el día"></input>
                            </div>
                            <div className="d-flex flex-row boton-sepa-iz">
                                <input className="boton-inside-evento" type="text" className="comentario hora-ev" placeholder="Selecione la hora"></input>
                            </div>   
                            <div className="sepa-iz me-eve hora-input">Se os enviará un recordatorio a ambos un día y una hora antes del evento</div>
                            <div className="d-flex flex-row justify-content-center">
                                <button className="btn-valorar">Valorar</button>
                            </div> 
                        </div>                     */}
                    </form>
                </div>
            </div>
        )
    }
}

export default NewEvent;