import React from 'react';
import '../App.css';
import './styles/Category.css'

function Category() {
  return (
    <div className="Category">
        <div className="container-fluid boxe">
          <div className="row">
            <div className="col box1 justify-content-center ">  
                <div>
                  <img className="picture rounded-circle" src={require('../assets/pero2.jpg')}></img>
                </div>
                <div className="text-box">
                  <p className="h-100">Niños</p>
                </div>
            </div>
            <div className="col box1 justify-content-center ">  
                <div>
                  <img className="picture rounded-circle" src={require('../assets/persona2.jpg')}></img>
                </div>
                <div className="text-box ">
                  <p className="h-100">Limpieza</p>
                </div>
            </div>
            <div className="col box1 justify-content-center ">  
                <div>
                  <img className="picture rounded-circle" src={require('../assets/pero2.jpg')}></img>
                </div>
                <div className="text-box ">
                  <p className="h-100">Mascota</p>
                </div>
            </div>
            <div className="col box1 justify-content-center ">  
                <div>
                  <img className="picture rounded-circle" src={require('../assets/persona2.jpg')}></img>
                </div>
                <div className="text-box ">
                  <p className="h-100">Profes</p>
                </div>
            </div>
            <div className="col box1 justify-content-center ">  
                <div>
                  <img className="picture rounded-circle" src={require('../assets/pero2.jpg')}></img>
                </div>
                <div className="text-box ">
                  <p className="h-100">Entrenadores</p>
                </div>
            </div>
            <div className="col box1 justify-content-center ">  
                <div>
                  <img className="picture rounded-circle" src={require('../assets/persona2.jpg')}></img>
                </div>
                <div className="text-box ">
                  <p className="h-100">Otros</p>
                </div>
            </div>
          </div>
        </div>
    </div>
  );
}

export default Category;
