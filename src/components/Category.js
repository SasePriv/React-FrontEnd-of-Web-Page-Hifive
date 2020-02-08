import React, {Component} from 'react';
import '../App.css';
import './styles/Category.css'

import { cate } from '../assets/category_list.json'

class Category extends Component {
  constructor(){
    super();
    this.state = {
        cate,
        selectItem: undefined,
        opcion: 0
    };
    
    this.handaleSelect = this.handaleSelect.bind(this);
  }

  handaleSelect = (e,index) => {
    this.setState({
      selectItem: index,
      opcion: 1
    })
    // console.log(index)
    // console.log(this.state.selectItem)
  }

  handaleUnSelect = (e) => {
    this.setState({
      selectItem: undefined,
      opcion: 0
    })
  }

  selected() {

    const select_pers = this.state.cate.filter(cate => {return cate.number === this.state.selectItem})

    if (this.state.opcion === 1) {
      return (<div className="box1 justify-content-center">  
                <div>
                  <img className="picture rounded-circle red-shadow" alt={select_pers.alt}src={require("../assets/img/"+select_pers[0].path_image)}></img>
                </div>                
                  <div className="text-box red-box" onClick={(e) => this.handaleUnSelect(e)}>
                    <p>{select_pers[0].title}</p>
                  </div>                
              </div> )
    }
  }

  render(){

    var catego = undefined;
    var size = {
      width: '808px',
    };

    if(this.state.opcion !== 0){
      catego = this.state.cate.filter((cate) => {
        return cate.number !== this.state.selectItem
      });
      size = {
        width: '748px',
        left: '31%',
      };
    }else{
      catego = this.state.cate;
    }

    return (
      <div className="d-flex justify-content-center ">
          { this.selected()}
          <div className="Category" style={size}>
              <div className="container flex-wrap boxe">
                <div className="row">
                  { catego.map(e => 
                  <div className="col" key={e.number}>  
                    <div>
                      <img className="picture rounded-circle" alt={e.alt} src={require("../assets/img/"+e.path_image)}></img>
                    </div>
                      <div className="text-box" onClick={(x) => this.handaleSelect(x,e.number)}>
                        <p>{e.title}</p>
                      </div>
                  </div>
                  )}
                  
                </div>
              </div>
          </div>  
      </div>
    );
  }
}
export default Category;
