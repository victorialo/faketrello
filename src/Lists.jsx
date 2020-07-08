import React, { useState } from "react";
import styled from 'styled-components';
// import { DragDropContext } from 'react-beautiful-dnd';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const List = styled.div`
  margin: 0 auto;
`

const AddItem = styled.input`
  
`
const Items = styled.div`
  margin: 0 auto;
`
const Item = styled.div`
  display: flex;
  justify-content: space-between;
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
  const [input, setInput] = useState(["","",""]);
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
    return (
      <List className={num}>
      <form onSubmit={(e) => addItem(e, num)}>
        <AddItem type="text" onChange={e => updateInput(e, num)} value={input[num]}/>
      </form>
      <Items>
        <Droppable droppableId={`list-${num}`}>
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              style={{ backgroundColor: snapshot.isDraggingOver ? 'aliceblue' : 'grey' }}
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