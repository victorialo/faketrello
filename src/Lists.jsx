import React, { useState } from "react";
import styled from 'styled-components/macro';
// import { DragDropContext } from 'react-beautiful-dnd';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { numLists } from './constants';

const List = styled.div`
  margin: 10px auto;
  border: 1px black solid;
  background-color: darkslateblue;
  padding: 10px;
  width: 100%;
  
  &.list-0 {
    background-color: darkred;
    //button {
    //   background-color: darkred;
    //}
  }
  &.list-1 {
    background-color: darkkhaki;
    //button {
    //   background-color: darkkhaki;
    //}
  }
  &.list-2 {
    background-color: #61dafb;
    //button {
    //   background-color: #61dafb;
    //}
  }
  button { 
    background: none;
    //border: 0;
    border-radius: 0;
    box-shadow: none;
    -webkit-appearance: none;
    
    //background-color: inherit;
    background-color: rgba(255,255,255,0.7);
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
// var randomColor = Math.floor(Math.random()*16777215).toString(16);

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
  padding: 5px;
  border: 1px black solid;
  background-color: rgba(255, 255, 255, 0.8);
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

  const [lists, setLists] = useState(new Array(numLists).fill(null).map(() => []));
  const [input, setInput] = useState(new Array(numLists).fill(null).map(() => ""));
  const [titles, setTitles] = useState(new Array(numLists).fill(null).map(() => ""));
  const [entries, setEntries] = useState(new Set());

  const addItem = (e, listNum) => {
    e.preventDefault();
    const num = parseInt(listNum);
    // const input = e.target.value();
    // console.log("input", num, input[num]);
    let item = input[num];
    if (item.length < 1 || entries.has(item)) {//lists[listNum].includes(input[num])) {
      console.error("bad input - empty or duplicate");
      return;
    };
    let newLists = [...lists];
    let current = newLists[num];
    current.push(item);
    newLists[num] = current;
    setLists(newLists);
    entries.add(item);
    setEntries(entries);
    // console.log("updated list", newLists);
    setInput(["","",""]);
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
                {i}
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
      <List className={`list-${num}`}>
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
                className={`list-${num}`}
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
    })
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



  // useEffect(buildLists, [lists]);


  return (
    <DragDropContext onDragEnd={drop}>
      {buildLists()}
    </DragDropContext>
  );
}
export default Lists;