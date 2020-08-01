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
  cursor: pointer;

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
  // const [stateVersion, setStateVersion] = useState(0);
  const toggleDarkMode = () => {
    const newStatus = !dark;
    setDark(newStatus);
    localStorage.setItem('dark', newStatus);
  }
  const exportData = async () => {
    const fileName = "tasksdata";
    const data = JSON.stringify(localStorage);
    console.log("data", data);
    const blob = new Blob([data], {type:'application/json'});
    const href = await URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = href;
    link.download = fileName + ".json";
    console.log("link", link);
    link.click();
  }
  const importData = (e) => {
    // console.log("file", file);
    // console.log("file", e.target.files[0]);
    let reader = new FileReader();
    reader.onload = (e) => {
      console.log(e.target.result);
      let data = JSON.parse(e.target.result);
      // alert_data(obj.name, obj.family);
      // let data = JSON.parse(file);
      for (let key in data) {
        if (data.hasOwnProperty(key)) {
          localStorage[key] = data[key];
        }
      }
    };
    reader.readAsText(e.target.files[0]);
    window.location.reload();
    // setStateVersion(stateVersion+1);
  }
  // useEffect(() => {
  //   window.location.reload();
  // }, [localStorage]);

  return (
    <div className={`App ${!!dark ? 'dark' : ''}`}>
      {/*  <img src={logo} className="App-logo" alt="logo" />*/}
      {/*<header className="App-header">*/}
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
        {/*<Lists key={stateVersion}/>*/}
        <Lists/>
      </NotTrello>
      <button onClick={exportData}>Export tasks</button>
      {/*Import tasks*/}
      <input type="file" accept={".json"} onChange={e=>importData(e)}/>

    </div>
  );
}

export default App;
