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
  font-family: 'Playfair Display', serif;
  font-size: 40px;

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
  font-family: 'Merriweather', serif;
`

function App() {
  const [dark, setDark] = useState((localStorage.getItem('dark') === 'true') || false);
  const toggleDarkMode = () => {
    const newStatus = !dark;
    setDark(newStatus);
    localStorage.setItem('dark', newStatus);
  }
  const exportData = async () => {
    const fileName = "tasksdata";
    const data = JSON.stringify(localStorage);
    const blob = new Blob([data], {type:'application/json'});
    const href = await URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = href;
    link.download = fileName + ".json";
    link.click();
  }
  const importData = (e) => {
    let reader = new FileReader();
    reader.onload = (e) => {
      let data = JSON.parse(e.target.result);
      for (let key in data) {
        if (data.hasOwnProperty(key)) {
          localStorage[key] = data[key];
        }
      }
    };
    reader.readAsText(e.target.files[0]);
    window.location.reload();
  }

  return (
    <div className={`App ${!!dark ? 'dark' : ''}`}>
      <Title className={!!dark ? 'darkTitle' : ''} onClick={toggleDarkMode}>
        {/*F A K E &nbsp; T R E L L O*/}
        T R E L L N O
      </Title>
      <NotTrello>
        <Lists/>
      </NotTrello>
      <button onClick={exportData}>Export tasks</button>
      {/*Import tasks*/}
      <input type="file" accept={".json"} onChange={e=>importData(e)}/>

    </div>
  );
}

export default App;
