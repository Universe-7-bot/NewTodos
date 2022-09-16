import React, { useState, useEffect } from "react";
import "./index.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import todo from "./todo.svg";
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const App = () => {

  //get items from local storage
  const getTodoItems = () => {
    const localData = localStorage.getItem("todoList");
    if (localData) return JSON.parse(localStorage.getItem("todoList")); //convert it into an array
    else return [];
  }

  const [inputData, setInputData] = useState("");
  const [items, setItems] = useState(getTodoItems()); //items - array
  const [name, setName] = useState("Check List");
  const [toggle, setToggle] = useState(true);
  const [isEditItem, setIsEditItem] = useState();

  const inputEvent = (event) => {
    setInputData(event.target.value);
  }

  const addItem = () => {
    if (!inputData) {
      alert("add an item");
    }
    else if (inputData && !toggle) {
      setItems(items.map((elem) => {
        if (elem.id === isEditItem) return { ...items, name: inputData };

        return elem;
      })
      )

      setToggle(true);
      setInputData("");
      setIsEditItem(null);
    }
    else {
      /* M-1
      setItems([...items, inputData]); //[] - array ...items - prev values
      setInputData("");
      */

      const allInputData = { id: new Date().getTime().toString(), name: inputData };
      setItems([...items, allInputData]);
      setInputData("");
    }
  }

  const deleteItem = (index) => {
    /* M-1
    const updatedItems = items.filter((elem, ind) => {
      return ind !== id;
    })
    */

    const updatedItems = items.filter((elem) => {
      return index !== elem.id;
    })

    setItems(updatedItems);
  }

  const editItem = (id) => {
    const newEditItem = items.find((elem) => {
      return id === elem.id;
    })
    // console.log(newEditItem);

    setToggle(false);
    setInputData(newEditItem.name);
    setIsEditItem(id);
  }

  const changeNameIn = () => {
    setName("Remove All");
  }

  const changeNameOut = () => {
    setName("Check List");
  }

  const removeAll = () => {
    setItems([]);
  }

  //set items in local storage of browser
  useEffect(() => {
    localStorage.setItem("todoList", JSON.stringify(items)); //key: string value: string
  }, [items])

  return (
    <>
      <div className="main-div">
        <div className="container d-flex align-items-center justify-content-center">
          <div className="row">
            <div className="col-md-6">
              <div className="todo m-2">
                <div className="todo-first text-center m-2">
                  <h3 className="text-secondary m-2">Add your list here ✌️</h3>
                  <input onChange={inputEvent} value={inputData} type="text" className="form-control mt-4 shadow" placeholder="✍️ Add items..." />
                  {toggle ?
                    <span onClick={addItem} className="">
                      <Tooltip title="Add Item">
                        <IconButton aria-label="add" size="small" className="shadow my-3" >
                          <AddCircleIcon className="add-icon" fontSize="large" />
                        </IconButton>
                      </Tooltip>
                    </span>
                    :
                    <span onClick={addItem} className="">
                      <Tooltip title="Edit Item">
                        <IconButton aria-label="add" size="small" className="shadow my-3" >
                          <EditIcon className="add-icon" fontSize="large" />
                        </IconButton>
                      </Tooltip>
                    </span>
                  }
                </div>
                <div className="todo-second mt-2">
                  {
                    items.map((elem) => {
                      return (
                        <div className="list border border-white bg-white d-flex align-items-center justify-content-between m-2 rounded-5 shadow" key={elem.id}>
                          <h6 className="px-4 fw-normal pt-2">{elem.name}</h6>
                          <div>
                            <span className="" onClick={() => editItem(elem.id)} >
                              <Tooltip title="Edit Item">
                                <IconButton aria-label="edit" size="small" className="icon-btn shadow" >
                                  <EditIcon className="edit-icon" fontSize="small" />
                                </IconButton>
                              </Tooltip>
                            </span>
                            <span className="px-3" onClick={() => deleteItem(elem.id)} >
                              <Tooltip title="Delete Item">
                                <IconButton aria-label="delete" size="small" className="icon-btn shadow" >
                                  <DeleteIcon className="delete-icon" fontSize="small" />
                                </IconButton>
                              </Tooltip>
                            </span>
                          </div>
                        </div>
                      )
                    })
                  }
                </div>
                <div className="todo-third text-center mt-4">
                  <div className="my-3">
                    <h6 className="text-secondary">You have {items.length} pending tasks</h6>
                  </div>
                  <button onMouseEnter={changeNameIn} onMouseLeave={changeNameOut} onClick={removeAll} className="btn btn-outline-secondary fw-semibold m-2 shadow" >{name}</button>
                </div>
              </div>
            </div>
            <div className="col-md-6 d-flex align-items-center">
              <div className="todo-fourth">
                <img src={todo} className="ing-fluid" alt="myPic" height={300} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default App;

