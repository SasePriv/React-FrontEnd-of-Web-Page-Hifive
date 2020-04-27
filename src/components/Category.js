import React, {Component} from 'react';
import ScrollContainer from 'react-indiana-drag-scroll'
import './styles/Category.css'

import { cate } from '../assets/category_list.json'

class Category extends Component {
  constructor(){
    super();
    this.state = {
        cate,
    };
  }


  selected() {

    let select_pers = ""
    if (this.props.cate.opcion === 1) {
      select_pers = this.state.cate.filter(cate => {return cate.number === this.props.cate.selectItem})

      return (<div className="box1 justify-content-center">  
                <div>
                  <img className="picture rounded-circle red-shadow" alt={select_pers.alt}src={require("../assets/img/"+select_pers[0].path_image)}></img>
                </div>                
                  <div className="text-box red-box" onClick={(x) => this.props.unSelected(x)}>
                    <p>{select_pers[0].title}</p>
                  </div>                
              </div> )
    }
  }

  render(){
    var catego = undefined;
    var size = {
      width: '878px',
    };

    if(this.props.cate.opcion !== 0){
      catego = this.state.cate.filter((cate) => {
        return cate.number !== this.props.cate.selectItem
      });
      size = {
        width: '838px',
        left: '31%',
      };
    }else{
      catego = this.state.cate;
    }

    return (
      <div className="d-flex justify-content-center p-out">
        { this.selected()}
        <ScrollContainer className="slide-cate p-out">
            <div className="Category " style={size}>
                <div className="container boxe">
                  <div className="row">
                    { catego.map(e => 
                    <div className="col" key={e.number}>  
                      <div>
                        <img className="picture rounded-circle" alt={e.alt} src={require("../assets/img/"+e.path_image)}></img>
                      </div>
                      <div className="text-box" onClick={(x) => this.props.setSelected(x,e.number)}>
                        <p>{e.title}</p>
                      </div>
                    </div>
                    )}                    
                  </div>
                </div>
            </div>  
        </ScrollContainer>
      </div>
    );
  }
}
export default Category;
