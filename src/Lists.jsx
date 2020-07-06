import React, {useEffect, useState} from "react";
import styled from 'styled-components'

const List = styled.div`
  margin: 0 auto;
`

const AddItem = styled.input`
  
`
const Items = styled.div`
  margin: 0 auto;
`


// class Lists extends React.Component {
const Lists = (props) => {
  // initializeCateg = () => {
  //   // let categ = //new Map();
  //   // categ.set('one', []);
  //   // categ.set('two', []);
  //   // categ.set('three', []);
  //   let categ = [[], [], []];
  //   return categ;
  // }

  const [lists, setLists] = useState([[],[],[]]);
  const [input, setInput] = useState("");

  const updateList = (e, list) => {
    e.preventDefault();
    // const input = e.target.value();
    const num = parseInt(list)
    let newLists = [...lists];
    let current = newLists[num];
    current.push(input);
    newLists[num] = current;
    setLists(newLists);
    // Number(list)
  }

  const updateInput = (e) => {
    e.preventDefault();
    console.log("updating to", e.currentTarget.value);
    setInput(e.currentTarget.value);
  }

  const buildList = (num) => {
    let items = [...lists[num]];
    console.log("items in buildlist", items);
    return (<List className={num}>
      <form onSubmit={(e) => updateList(e, num)}><AddItem onChange={e => updateInput(e)}/></form>
      <Items>
        {items}
      </Items>
    </List>);
  }

  const buildLists = () => {
    let output = [];
    lists.forEach((l, i) => {
      output.push(buildList(i));
    })
    console.log("new output", output);
    return output;
    // for (let i=0; i<lists.length; i++) {
    //   output.push(buildList(i));
    // }
  }

  useEffect(buildLists, [lists]);


  return buildLists();
}
export default Lists;