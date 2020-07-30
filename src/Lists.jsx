import React, {useEffect, useState} from "react";
import styled from 'styled-components/macro';
// import { DragDropContext } from 'react-beautiful-dnd';
import {DragDropContext, Draggable, Droppable} from 'react-beautiful-dnd';
// import { numLists } from './constants';

const List = styled.div`
  margin: 10px auto;
  border: 1px black solid;
  background-color: darkslateblue;
  padding: 10px;
  width: 100%;
  
  &.list-${props => props.num} {
    background-color: ${props => props.color};
  }
  
  .darker {
    background-color: rgba(0,0,0,0.4);
  }
  
  button { 
    background: none;
    border-radius: 0;
    box-shadow: none;
    -webkit-appearance: none;
    
    //background-color: inherit;
    background: rgba(255,255,255,0.7);
    border: 1px black solid;
    
    &:hover {
      background-color: rgba(255,255,255,0.6);
    }
    &:active {
      box-shadow: 1px 1px 5px inset;
    }
  }
  
  @media only screen and (min-width: 992px) {
     width: 30%;
  }
  
`

const Error = styled.div`
  background-color: yellow;
  width: 100%;
  border: 1px solid black;
  padding: 10px;
`
const Title = styled.input`
  color: white;
  background: none;
  border-width: 0 0 1px 0;
  text-align: center;
  font-weight: bold;
  font-size: 20px;
  letter-spacing: 2px;
  text-shadow: 1px 1px 5px black;
  width: 100%;
`
const Input = styled.form`
  display: flex;
  justify-content: space-evenly;
  align-items: baseline;
  button {
    padding: 6px 15px;
    margin: 0 auto;
    border-radius: 10px;
  }
`
const AddItem = styled.input`
  margin: 10px;
  width: 80%;
  height: 100%;
`
const Items = styled.div`
  margin: 0 auto;
`
const Item = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 2px auto;
  padding: 10px 15px;
  border: 1px black solid;
  background-color: rgba(255, 255, 255, 0.8);
  position: relative;
  z-index: 2;
`
const Text = styled.input`
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  background: none;
  border: none;
  padding: 0;
  //&:hover {
  //  overflow: auto;
  //  text-overflow: initial;
  //}
  &:active {
    border: none;
  }
`
const AddListButton = styled.button`
  margin: 0 auto;
  padding: 10px;
`

const DeleteButton = styled.button`
  float: right;
`
const SelectColor = styled.input`
  float:left;
`

const Lists = () => {
// class Lists extends React.Component {

  const storedLists = localStorage.getItem('lists') ? JSON.parse(localStorage.getItem('lists')) : ["", "", ""]; // assumes 3 lists if no stored lists; Array.from({length: numLists}, () => []));
  const [numLists, setNumLists] = useState(storedLists.length || 3);
  const [lists, setLists] = useState(storedLists);//new Array(numLists).fill(null).map(() => [])
  const [input, setInput] = useState(Array.from({length:numLists}, () => "")); //new Array(numLists).fill(null).map(() => "")
  const [newItem, setNewItem] = useState([]);
  // const [titles, setTitles] = useState(Array.from({length: numLists}, () => "")); //new Array(numLists).fill(null).map(() => "")
  const [titles, setTitles] = useState(
    localStorage.getItem('titles')
      ? JSON.parse(localStorage.getItem('titles'))
      : ['To-Do', 'In Progress', 'Done'])
  const [entries, setEntries] = useState(
    // localStorage.getItem('entries')
    //   ? new Set(JSON.parse(localStorage.getItem('entries')))
    new Set(lists.reduce((a, b) => a.concat(b), []))
    || new Set());
  const [listColors, setListColors] = useState(
    localStorage.getItem('colors')
      ? JSON.parse(localStorage.getItem('colors'))
      : ["#8b0000", "#bdb76b", "#61dafb"]);
  const [errors, setErrors] = useState("");

  // localStorage.setItem('items', JSON.stringify(itemsArray))
  // const data = JSON.parse(localStorage.getItem('items'))

  const addItem = (e, listNum) => {
    e.preventDefault();
    const num = parseInt(listNum);
    // const input = e.target.value();
    let item = input[num];
    // console.log("input", item);
    // console.log("entries", entries);
    if (item.length < 1 || entries.has(item)) {//lists[listNum].includes(input[num])) {
      if (item.length < 1) {
        console.error("bad input - empty");
        setErrors("empty");
      } else if (entries.has(item)) {
        console.error("bad input - duplicate");
        setErrors("duplicate");
      }
      return;
    }
    let newLists = [...lists];
    let current = newLists[num];
    current.push(item);
    newLists[num] = current;
    setLists(newLists);
    entries.add(item);
    setEntries(entries);
    // console.log("updated list", newLists);
    const newInput = Array.from({length:numLists}, () => "");
    setInput(newInput);
    // Number(list)
  }

  const changeTitle = (e, num) => {
    e.preventDefault();
    const index = parseInt(num);
    let newTitles = [...titles];
    newTitles[index] = e.currentTarget.value;
    setTitles(newTitles);
  }

  const removeItem = (num, ind) => {
    const confirmation = window.confirm("Are you sure you would like to delete this item?");
    if (!confirmation) return;
    const list = parseInt(num);
    let newLists = [...lists];
    let current = newLists[list];
    // current.indexOf(item);
    let item = current[ind];
    // console.log("newlist", current);
    entries.delete(item);
    setEntries(entries);
    current.splice(ind, 1);
    newLists[num] = current;
    setLists(newLists);
  }

  const updateInput = (e, num) => {
    e.preventDefault();
    // console.log("updating to", e.currentTarget.value);
    // setInput(e.target.value);
    let newInput = [...input];
    newInput[num] = e.target.value;
    setErrors("");
    setInput(newInput);
  }

  const reorder = (list, indFrom, indTo) => {
    // let newList = [...list];
    // console.log(list.splice(indFrom,1));
    list.splice(indTo, 0, list.splice(indFrom,1)[0]);
    return list;
  }

  const move = (listFrom, listTo, indFrom, indTo) => {
    // let newListFrom = [...listFrom];
    // let newListTo = [...listTo];
    const removedItem = listFrom.splice(indFrom,1)[0];
    listTo.splice(indTo,0, removedItem);
    // console.log("listfrom", listFrom, "listto", listTo);
    return [listFrom, listTo];
  }

  const drop = (result) => {
    const { source, destination } = result;

    // dropped outside the list
    if (!destination) {
      return;
    }

    let newLists = [...lists];
    // console.log("old lists", newLists);
    if (source.droppableId === destination.droppableId) {
      // const updatedList =

      // let state = { items };
      const id = source.droppableId.split('-')[1];
      newLists[id] = reorder(
        // getList(source.droppableId),
        newLists[id],
        source.index,
        destination.index
      );

      // if (source.droppableId === 'droppable2') {
      // state = { selected: items };

      // }

      // this.setState(state);
      // console.log("reorder in list", newLists);
    } else {
      const sourceId = source.droppableId.split('-')[1];
      const destId = destination.droppableId.split('-')[1];
      const result = move(
        // getList(source.droppableId),
        // getList(destination.droppableId),
        newLists[sourceId],
        newLists[destId],
        source.index,
        destination.index
      );

      // this.setState({
      //   items: result.droppable,
      //   selected: result.droppable2
      // });
      newLists[sourceId] = result[0];
      newLists[destId] = result[1];
      // console.log("move across lists", newLists);

    }
    // console.log(newLists);
    setLists(newLists);
  }

  const randomColor = () => {
    return "#" + Math.floor(Math.random()*16777215).toString(16).toString();
  }
  const addList = () => {
    setNumLists(numLists+1);
    let newLists = [...lists];
    newLists.push([]);
    let newInput = [...input];
    newInput.push("");
    let newTitles = [...titles];
    newTitles.push("");
    let newListColors = [...listColors];
    newListColors.push(randomColor());
    setLists(newLists);
    setInput(newInput);
    setTitles(newTitles);
    setListColors(newListColors);
  }

  const deleteList = (num) => {
    const confirmation = window.confirm("Are you sure you would like to delete this list?");
    if (!confirmation) return;
    setNumLists(numLists-1);
    let newLists = [...lists];
    newLists.splice(num, 1);
    let newInput = [...input];
    newInput.splice(num, 1);
    let newTitles = [...titles];
    newTitles.splice(num, 1);
    let newListColors = [...listColors];
    newListColors.splice(num, 1);
    setLists(newLists);
    setInput(newInput);
    setTitles(newTitles);
    setListColors(newListColors);
  }

  const changeColor = (e,num) => {
    const color = e.target.value;
    let newListColors = [...listColors];
    newListColors[num] = color;
    setListColors(newListColors);
  }

  const updateItem = (e, num, ind) => {
    const [item, old] = newItem;
    entries.delete(old);
    entries.add(item);
    setEntries(entries);
    let newLists = [...lists];
    newLists[num][ind] = item;
    setLists(newLists);
  }

  const display = (orig) => {
    const [item, old] = newItem;
    return (old === orig) ? item : orig;
  }

  const buildList = (num) => {
    // console.log("building list", num);
    let items = [...lists[num]];
    // console.log("items in buildlist", items);
    // console.log("items", items);
    const itElems = items.map((i, ind) => {
      // console.log("i",i);
      return (
        <Draggable
          key={i}
          draggableId={i}
          index={ind}>
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              style={{ backgroundColor: snapshot.isDraggingOver ? 'aliceblue' : 'grey' }}
              {...provided.draggableProps}
              {...provided.dragHandleProps}

            >
              <Item id={i}>
                <Text value={display(i)} onChange={e => setNewItem([e.target.value, i])} onBlur={(e) => updateItem(e, num, ind)}/>
                <button onClick={()=> removeItem(num, ind)}>x</button>
              </Item>
            </div>
          )}
        </Draggable>
      );
    })
    // console.log("updating input in ", num);
    // console.log("classname", `list-${num}`);
    return (
      <List className={`list-${num}`} num={num} color={listColors[num]} >
        <DeleteButton onClick={()=>deleteList(num)}>x</DeleteButton>
        <SelectColor type={"color"} value={listColors[num]} onChange={(e) => changeColor(e,num)}/>
        <Title onChange={(e) => changeTitle(e, num)} value={titles[num]} />
        <Input onSubmit={(e) => addItem(e, num)}>
          <AddItem type="text" onChange={e => updateInput(e, num)} value={input[num]}/>
          <button onSubmit={(e) => addItem(e, num)}>Add</button>
        </Input>
        <Items>
          <Droppable droppableId={`list-${num}`}>
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                className={`darker`}
                // style={{ backgroundColor: snapshot.isDraggingOver ? 'aliceblue' : 'grey' }}
                {...provided.droppableProps}
              >
                {itElems}
                {provided.placeholder}
              </div>
             )}
            {/*{itElems}*/}
          </Droppable>
        </Items>
    </List>
    );
  }

  // fix issue with deleting things
  const buildLists = () => {
    let output = [];
    // console.log("updated lists", lists);
    lists.forEach((l, i) => {
      output.push(buildList(i));
    });
    // console.log("new output", output);
    return output;
    // for (let i=0; i<lists.length; i++) {
    //   output.push(buildList(i));
    // }
  }

  // const getList = (droppableId) => {
  //   const id = droppableId.split('-')[1];
  //   return lists[id];
  // }

  const buildError = () => {
    switch (errors) {
      case 'empty':
        return <Error>Your input is empty - please fill in something!</Error>
      case 'duplicate':
        return <Error>Your input {input} is already found in a list - please drag that over or use another input!</Error>
      default:
        return;
    }
  }

  // useEffect(buildLists, [lists]);
  useEffect(() => {
    localStorage.setItem('lists', JSON.stringify(lists));
  }, [lists]);
  useEffect(() => {
    localStorage.setItem('titles', JSON.stringify(titles));
  }, [titles]);
  useEffect(() => {
    localStorage.setItem('colors', JSON.stringify(listColors));
  }, [listColors]);


  return (
    <DragDropContext onDragEnd={drop}>
      {buildError()}
      {buildLists()}
      <AddListButton onClick={addList}>+</AddListButton>
    </DragDropContext>
  );
}
export default Lists;