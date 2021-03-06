import React, { Component } from 'react';
import "./styles/ImageLoader.sass"
import "./styles/prueba.css"

const _loaded = {};

class ImageLoader extends Component {
    constructor(props) {
        super(props);
        //initial state: image loaded stage 
        this.state = { 
            loaded: _loaded[this.props.src]
         }         
    }

    //define our loading and loaded image classes
    static defaultProps = {
        className: "",
        loadingClassName: "img-loading",
        loadedClassName: "img-loaded"
    };

    //image onLoad handler to update state to loaded
    onLoad = () => {
        _loaded[this.props.src] = true;
        this.setState(() => ({ 
            loaded: true 
        }));
    };

    render() { 
        let { className, loadedClassName, loadingClassName } = this.props;

        className = `${className} ${this.state.loaded
        ? loadedClassName
        : loadingClassName}`;

        return <img 
                alt={this.props.alt}
                src={this.props.src} 
                onClick={this.props.onClick} 
                className={className} 
                onLoad={this.onLoad} />;
        }
}
 
export default ImageLoader;