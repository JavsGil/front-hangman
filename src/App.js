import React, { useState, useEffect } from 'react'
import './App.css';
import baseURL from './api/base_api';

function App() {

  const [listaCategoria, setListaCategoria] = useState([])
  const [categoria, setcategoria] = useState([]);
  const [Palabra, setPalabra] = useState([]);
  const [Palabra2, setPalabra2] = useState([]);
  const [ronda, setRonda] = useState(0);
  const [intento, setIntento] = useState(0);
  const alfabeto = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "ñ", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];

  const listardatos = async () => {
    try {
      const { data } = await baseURL.get(`/categorias`);
      if (data.length > 0) {
        setListaCategoria(data);
      }
    } catch (e) {
      console.warn(e);
    }
  }

  const filtrarPalabras = async (id) => {
    try {
      const { data } = await baseURL.get(`/palabrasByCategoria/${id}`);
      if (data.length > 0) {
        selectPosicion(data[0].palabras);
        setcategoria(data[0].name);
      }
    } catch (e) {
      console.warn(e);
    }
  }

  const selectPosicion = (palabras) => {
    try {
      let countP = palabras.length;
      let position;
      let countL;
      let newpalabra;
      position = Math.floor(Math.random() * countP);
      newpalabra = palabras[position].name;
      countL = newpalabra.length;
      for (var i = 0; i < countL; i++) {
        Palabra.push(newpalabra[i]);
        Palabra2.push({ "name": newpalabra[i], "value": false });
      }
      setRonda(ronda + 1);
      setIntento(0);
    } catch (e) {
      console.warn(e);
    }
  }

  const buscandoLetra = (e) => {
    try {   
        let response;
        for (var s in Palabra) {
          if (Palabra[s] == e) {
            let newpalabra2 = Palabra2;
            newpalabra2[s].value = true;
            setPalabra2(newpalabra2);
          }
        }
        setIntento(intento + 1)
        return response = true;
    } catch (e) {
      console.warn(e);
    }
  }

  return (
    <div className="App">

      <button onClick={e => listardatos()}>Cargar Data</button>
      
      {listaCategoria?.length > 0 &&
        <div>

          <div style={{ display: "flex" }}>
            <div>{categoria}</div>
            <select
              onChange={e => filtrarPalabras(e.target.value)}
            >
              <option>seleccione una opcion</option>
              {listaCategoria.map((i, key) => {
                return (
                  <option key={key}
                    value={i.id}
                  >
                    {i.name}
                  </option>
                )
              })}
            </select>
          </div>

          <div style={{ height: "80px", display: "flex",width:"100%",justifyContent:"center" }}>
            {
              Palabra2.map((i, key) => {
                return (
                  <Letra2 key={key} L={i.name} visible={i.value} buscandoLetra={buscandoLetra} />
                )
              })
            }
          </div>

          <div style={{width: "100%", display: "flex", margin:"10px", justifyContent:"center"}}>
            {intento == 10 &&
            <div style={{fontSize: "40px" }}>game over</div>
            }
            {intento < 10 &&
              <div style={{display:"flex"}}>
                {
                  alfabeto.map((i, key) => {
                    return (
                      <Letra key={key} L={i} visible={true} buscandoLetra={buscandoLetra} />
                    )
                  })
                }
              </div>
            }
          </div>

          <div style={{display:"flex", width: "100%", fontSize: "20px",justifyContent:"center"}}>
            Ronda: {ronda} / Intento: {intento}
          </div>
      </div>
      }
    </div>
  );
}

const Letra = (props) => {
  try {
    const [visible, setvisible] = useState(props.visible);
    function letraUsada(e) {
      try {
        setvisible(false);
        const response = props.buscandoLetra(e);
      } catch (e) {
        console.war(e);
      }
    }
    return (
      <div
        style={{
          opacity: visible ? 1 : 0,
          backgroundColor: "silver",
          color: "black",
          lineHeight: "30px",
          width: "30px",
          height: "30px",
          margin: "4px",
          cursor: "pointer"
        }}
        onClick={e => letraUsada(props.L)}
      >{props.L}</div>
    )
  } catch (e) {
    console.war(e);
  }
}

const Letra2 = (props) => {
    return (
      <div
        style={{
          backgroundColor: "silver",
          color: props.visible ? "black": "silver",
          lineHeight: "30px",
          width: "30px",
          height: "30px",
          margin: "4px",
          cursor: "pointer"
        }}
      >{props.L}</div>
    )
}

export default App;