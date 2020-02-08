import React, {Component} from 'react';
import Category from './Category'
import Search from './Search'
import Content from './Content'
import Bar from './Bar';

class Home extends Component{

  constructor(){
    super();
    this.state = {
      auth: false
    }
  }
  
  mostrar(){
    if (this.state.auth) {
      return(<Bar></Bar>)
    }
  }

  render(){


    return (
      <div className="d-flex justify-content-center flex-column">
          <div className="p-2">
            <div>
              <Category></Category>
            </div>
          </div>
          <div className="d-inline-flex p-2">
            <div>
              <Search></Search>
            </div>
          </div>
          <div className="p-2">
            <div>
              <Content></Content>
              {this.mostrar()}
            </div>
          </div>
      </div>
    );
  }
 
}

export default Home;
