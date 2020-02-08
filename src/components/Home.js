import React from 'react';
import '../App.css';
import Category from './Category'
import Search from './Search'
import Content from './Content'

function Home() {
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
          </div>
        </div>
    </div>
  );
}

export default Home;
