import React, {Component} from 'react';
import './styles/Search.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

class Search extends Component {


    render(){

        return (
            <div className="d-flex search">
                <div className="icon-logo">
                    <img alt="logo" src={require("../assets/img/logo_vec.png")}></img>
                </div>
                <div className="in">
                    <FontAwesomeIcon className="icono-buscar"icon={faSearch}/>
                    <input onKeyDown={this.props.changeErrase} onChange={this.props.onChange} type="text" className="form-control search-input" placeholder="Buscar en hifive" />
                </div>
            </div>
        )
    }
}

export default Search;