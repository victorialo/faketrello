import React, {useState} from 'react';
// import logo from './logo.svg';
import styled from 'styled-components'
import './App.css';
import Lists from './Lists';

const Title = styled.h1`
  text-shadow: 0 0 2px black;
  letter-spacing: 4px;
  border-bottom: 1px black solid;
  margin: 0;
  padding: 10px;

  &.darkTitle {
    color: white;
    text-shadow: 0 0 2px white;
  }
`

const NotTrello = styled.div`
  position: relative;
  width: 80%;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
`



function App() {
  const [dark, setDark] = useState((localStorage.getItem('dark') === 'true') || false);
  const toggleDarkMode = () => {
    const newStatus = !dark;
    setDark(newStatus);
    localStorage.setItem('dark', newStatus);
  }

  return (
    <div className={`App ${!!dark ? 'dark' : ''}`}>
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
      <Title className={!!dark ? 'darkTitle' : ''} onClick={toggleDarkMode}>
        F A K E &nbsp; T R E L L O
      </Title>
      <NotTrello>
        <Lists/>
      </NotTrello>



    </div>
  );
}

export default App;
