import React from 'react';
// import logo from './logo.svg';
import styled from 'styled-components'
import './App.css';
import Lists from './Lists';

const NotTrello = styled.div`
  position: relative;
  width: 80%;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
`

function App() {

  return (
    <div className="App">
      {/*<header className="App-header">*/}
      {/*  <img src={logo} className="App-logo" alt="logo" />*/}
      {/*  <p>*/}
      {/*    Edit <code>src/App.js</code> and save to reload.*/}
      {/*  </p>*/}
      {/*  <a*/}
      {/*    className="App-link"*/}
      {/*    href="https://reactjs.org"*/}
      {/*    target="_blank"*/}
      {/*    rel="noopener noreferrer"*/}
      {/*  >*/}
      {/*    Learn React*/}
      {/*  </a>*/}
      {/*</header>*/}
      <h1>F A K E &nbsp; T R E L L O</h1>
      <NotTrello>
        <Lists/>
      </NotTrello>



    </div>
  );
}

export default App;
