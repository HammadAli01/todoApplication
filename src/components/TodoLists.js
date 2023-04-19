import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  deleteTodo,
  editTodo,
  markTodoCompleted,
  clearAlltodo,
} from "../redux/actions/Actions";
import { Custombutton } from "./Custombutton";
import { Custominput } from "./Custominput";
import { Customtable } from "./Customtable";

export const TodoLists = () => {
  const { todos } = useSelector((state) => state.todoReducer);
  const dispatch = useDispatch();
  const [selectedTodo, setSelectedTodo] = useState([]);

  const actionClick = (data) => {
    if (data && data?.type === "edit") {
      console.log(data, "actioncalled");
      dispatch(editTodo(data?.todo?.id));
    } else if (data && data?.type === "delete") {
      dispatch(deleteTodo(data?.todo?.id));
    }
  };

  const changeEvent = (e, todoId) => {
    console.log("todo id got is ", todoId);
    if (e?.target?.name !== "select_all_todo" && e?.target?.checked === true) {
      if (selectedTodo.indexOf(todoId) === -1) {
        setSelectedTodo((todo) => [...todo, todoId]);
      }
    } else if (
      e?.target?.name !== "select_all_todo" &&
      e?.target?.checked === false
    ) {
      alert("case 2");
      const todos = selectedTodo.filter((todo) => todo !== todoId);
      setSelectedTodo(todos);
    }

    if (e?.target?.name === "select_all_todo" && e?.target?.checked === true) {
      alert("case 1");
      todos &&
        todos.forEach((todo, index) => {
          const allChkbox = document.getElementsByName(`todo_${index}`);
          allChkbox.forEach((chk) => {
            chk.checked = true;
            let todoId = todo?.id;
            setSelectedTodo((todo) => [...todo, todoId]);
          });
        });
    } else if (
      e?.target?.name === "select_all_todo" &&
      e?.target?.checked === false
    ) {
      alert("case 2");
      todos &&
        todos.forEach((todo, index) => {
          const allChkbox = document.getElementsByName(`todo_${index}`);
          allChkbox.forEach((chk) => {
            chk.checked = false;
            setSelectedTodo([]);
          });
        });
    }
  };
  const handleClick = (text, todo) => {
    if (text == "Edit") {
      //console.log("ed called");
      actionClick({ todo: todo, type: "edit" });
    } else if (text == "Delete") {
      // console.log("del called");
      actionClick({ todo: todo, type: "delete" });
    }
  };
  const markCompleted = () => {
    dispatch(markTodoCompleted(selectedTodo));
  };
  const handleCleartodo = () => {
    dispatch(clearAlltodo());
  };
  const tableHeaders = [
    {
      inputData: {
        type: "checkbox",
        inputHandler: changeEvent,
        name: "select_all_todo",
      },
      label: "input",
      width: "3%",
    },
    { label: "title", width: "30%" },
    { label: "description", width: "42%" },
    { label: "status", width: "8%" },
    { label: "action", width: "20%", buttons: ["edit", "delete"] },
  ];
  return (
    <div className="container my-2">
      <div className="row pb-4" style={{ height: "60px" }}>
        <div className="col-xl-12 text-right">
          {selectedTodo.length > 0 && (
            <>
              <Custombutton
                classname="btn btn-danger"
                handleClick={handleCleartodo}
                text="Clear Todos"
              />

              <Custombutton
                classname="btn btn-success ml-2"
                handleClick={markCompleted}
                text="Mark As Completed"
              />
            </>
          )}
        </div>
      </div>
      <Customtable
        headers={tableHeaders}
        handleClick={handleClick}
        data={todos}
      />
      {/* <table className="table table-bordered">
        <thead>
          <tr>
            {tableHeaders?.map((header) => {
              if (header.label !== "input") {
                return <th width={header.width}>{header.label}</th>;
              } else {
                return (
                  <th width={header.width}>
                    <Custominput
                      type={header?.inputData?.type}
                      inputHandler={header?.inputData?.inputHandler}
                      name={header?.inputData?.name}
                    />
                  </th>
                );
              }
            })}
          </tr>
        </thead>
        <Customtable
          headers={tableHeaders}
          handleClick={handleClick}
          data={todos}
        />
        {/* <tbody>
          {todos &&
            todos.map((todo, index) => (
              <tr key={index}>
                <td>
                  <Custominput
                    type="checkbox"
                    value={todo?.id}
                    inputHandler={changeEvent}
                    name={`todo_${index}`}
                    todo={todo}
                  />
                </td>
                <td>{todo?.title}</td>
                <td>{todo?.description}</td>
                <td>
                  {todo?.isCompleted ? (
                    <span className="p-2">Completed</span>
                  ) : todo?.isPending ? (
                    <span className="p-2">Pending</span>
                  ) : (
                    ""
                  )}
                </td>
                <td>
                  <Custombutton
                    classname="btn btn-primary btn-sm"
                    handleClick={handleClick}
                    text="Edit"
                    todo={todo}
                  />
                  <Custombutton
                    classname="btn btn-danger btn-sm ml-1"
                    handleClick={handleClick}
                    text="Delete"
                    todo={todo}
                  />
                </td>
              </tr>
            ))}
        </tbody> 
      </table> */}
    </div>
  );
};
