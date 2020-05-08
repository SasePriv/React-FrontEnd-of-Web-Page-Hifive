import React, {Component} from 'react';
import './styles/review.css'
import Rating from 'react-star-review';
import TextareaAutosize from 'react-textarea-autosize';
import diploma from '../assets/svg/diploma.svg'
import relog from '../assets/svg/relog.svg'
import smile from '../assets/svg/smile.svg'
import axios from 'axios';
import xIcon from '../assets/svg/x.svg'

class Review extends Component{
    constructor(props){
        super(props);
        this.state = {
            user_id: "",
            service_user_id: "",
            serviceUserImgUrl: "",
            service_id: "",
            modificar: false,
            data: null,
            formReview: {
                kindness: "",
                knowledge: "",
                punctuality: "",
                comment: ""
            },
            url: "https://ec2-35-178-169-125.eu-west-2.compute.amazonaws.com/hifive-rest-api/public/serviceImages/"
        }
    }

    UNSAFE_componentWillMount = () =>{
        this.setState({
            user_id: this.props.userid,
            service_user_id: this.props.serviceUserId,
            service_id: this.props.serviceId,
            modificar: this.props.modi,
            formReview: {
                kindness: this.props.formReview.kindness,
                knowledge: this.props.formReview.knowledge,
                punctuality: this.props.formReview.punctuality,
                comment:this.props.formReview.comment,
            }
        })

        if (this.props.modi) {
            this.fecthExistingReview(this.props.userid, this.props.serviceId)
        }
    }

    componentDidMount = () =>{
        this.fetchDataforReview()
    }


    fetchDataforReview = async () =>{
        try {
            await axios
            .get(`/getServiceForReview/${this.state.service_id}`)
            .then(res =>{
                if (res.data.response) {
                    this.setState({
                        data: res.data.data
                    })
                }
            })
        } catch (error) {
            console.log(error)
        }
    }

    handleChange = (e) =>{
        this.setState({
            formReview:{
                ...this.state.formReview,
                [e.target.name]: e.target.value
            }
        })
    }

    handleRaintingChange = (rating, name) =>{
        this.setState({
            formReview:{
                ...this.state.formReview,
                [name]: rating
            }
        })
    }

    handleSubmit = async(e) =>{
        e.preventDefault()

        let newData
        let formData = new FormData()
        formData.append("service_id", this.state.service_id)
        formData.append("user_id", this.state.user_id)
        formData.append("kindness", this.state.formReview.kindness)
        formData.append("knowledge", this.state.formReview.knowledge)
        formData.append("punctuality", this.state.formReview.punctuality)
        formData.append("comment", this.state.formReview.comment)

        await axios
        .post("/reviews", formData)
        .then(res =>{
            if (res.data.response) {
                newData = res.data.data
                console.log("Review Succesful")
            }
        })
        this.props.onSubmitEvent(newData)
    }

    clickCloseX = () =>{
        this.props.closeReview()
    }


    render(){ 
        return(
            <div className="d-flex fondo tamaño-window">
                <div onClick={this.clickCloseX} className="xSalir">
                    <img src={xIcon} alt="xSalir"  />
                </div>
                <div className="flex-column carta">
                    <div className="p-2 sin-padding">
                        <img alt="reviewFondo" src={require('../assets/img/fondo-review.jpg')}></img>
                    </div>
                    <form onSubmit={this.handleSubmit} className="p-2 card-style">
                        <div className="d-flex flex-row">
                            <div className="p-2 font-titulo">Valoración</div>
                        </div>
                        <div className="d-flex flex-row perfil">
                            <div className="p-2">
                                <img src={this.state.url+this.state.data?.serviceImage[0].attachment} alt="imagen-perfil-review" className="image-service-review" />
                            </div>
                            <div className="p-2 contenido">
                                <div className="header-name">{this.state.data?.userData.name}</div>
                                <div className="cargo">{this.state.data?.title}</div>
                            </div>
                        </div>
                        <div className="d-flex flex-row star-perfil form-group">
                            <div className="p-2 separacion">
                                <img alt="icon" src={smile}></img>
                                <div className="texto-review">Feeling</div>
                            </div>
                            <div className="p-2">
                                <Rating name="kindness" filledColor="#ed8a19" borderColor="#ed8a19" rating={this.state.formReview.kindness} interactive onRatingChanged={(r) => this.handleRaintingChange(r,"kindness")}></Rating>
                            </div>
                        </div>
                        <div className="d-flex flex-row star-perfil star-2 form-group">
                            <div className="p-2 separacion sepa-2">
                                <img alt="icon" src={diploma}></img>
                                <div className="texto-review">Trabajo</div>
                            </div>
                            <div className="p-2">
                                 <Rating name="knowledge" filledColor="#ed8a19" borderColor="#ed8a19" rating={this.state.formReview.knowledge} interactive onRatingChanged={(r) => this.handleRaintingChange(r,"knowledge")}></Rating>
                            </div>
                        </div>
                        <div className="d-flex flex-row star-perfil star-3 form-group">
                            <div className="p-2 separacion sepa-3">
                                <img alt="icon" src={relog}></img>
                                <div className="texto-review">Puntualidad</div>
                            </div>
                            <div className="p-2">
                                <Rating name="punctuality" filledColor="#ed8a19" borderColor="#ed8a19" rating={this.state.formReview.punctuality} interactive onRatingChanged={(r) => this.handleRaintingChange(r,"punctuality")}></Rating>
                            </div>
                        </div>                        
                        <div id="sepa">
                            <div className="d-flex flex-row">
                                <div className="texto-review header-comen">
                                    Añade un comentario(opcional)
                                </div>
                            </div>
                            <div className="d-flex flex-row justify-content-center">
                                <TextareaAutosize onChange={this.handleChange} name="comment" value={this.state.formReview.comment} className="comentario" placeholder="Comentario" ></TextareaAutosize>
                            </div>   
                            <div className="d-flex flex-row justify-content-center">
                                <button className="btn-valorar">Valorar</button>
                            </div>
                        </div>                    
                    </form>
                </div>
            </div>
        )
    }
}

export default Review;