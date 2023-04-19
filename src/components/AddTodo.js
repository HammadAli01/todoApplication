import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addNewTodo, updateTodo } from "../redux/actions/Actions";
import { Custominput } from "./Custominput";
import { Custombutton } from "./Custombutton";

export const AddTodo = () => {
  const [value, setValue] = useState({});
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const { isEdit } = useSelector((state) => state.todoReducer);
  const { editTodo } = useSelector((state) => state.todoReducer);
  const inputSchema = [
    {
      type: "text",
      name: "title",
      placeholder: "Enter title",
      label: "Title",
      classname: "form-control mb-2 mr-sm-3",
    },
    {
      type: "text",
      label: "Description",
      name: "description",
      placeholder: "Enter description",
      classname: "form-control mb-2 mr-sm-3",
    },
  ];
  useEffect(() => {
    editTodo && setValue(editTodo);
    //console.log("Edit todo", editTodo);
  }, [editTodo]);

  const onSubmit = (e) => {
    e.preventDefault();
    console.log("called", !value?.title, !value?.description);
    if (!value?.title) {
      if (error?.title?.length !== 0) {
        setError((error) => ({
          ...error,
          title: "Please enter todo title",
        }));
      }
      return;
    }
    if (!value?.description) {
      if (error?.title?.length !== 0) {
        setError((error) => ({
          ...error,
          description: "Please enter todo description",
        }));
      }
      return;
    }

    if (isEdit) {
      dispatch(updateTodo(editTodo.id, value));
    } else {
      dispatch(addNewTodo(value));
    }
    setValue({ title: "", description: "" });
    document.getElementById("todoForm").reset();
  };

  const changeEvent = (e) => {
    setValue({
      ...value,
      [e.target.name]: e.target.value,
    });
    if (e?.target?.name === "title") {
      setError({
        title: "",
      });
    }
    if (e?.target?.name === "description") {
      setError({
        description: "",
      });
    }
  };
  const handleBlur = (e) => {
    if (e?.target?.name === "title") {
      if (e.target?.value.trim() == 0) {
        setError((error) => ({
          ...error,
          title: "Please enter todo title",
        }));
      }
    }

    if (e?.target?.name === "description") {
      if (e.target?.value.trim() == 0) {
        setError((error) => ({
          ...error,
          description: "Please enter todo description",
        }));
      }
    }
  };
  return (
    <div className="container my-4 py-1 border">
      <form className="mt-3 mb-2" id="todoForm" onSubmit={onSubmit}>
        <div className="row">
          {inputSchema?.map((input) => (
            <Custominput
              type={input.type}
              label={input.label}
              handleBlur={handleBlur}
              value={value?.[input.name]}
              error={error?.[input.name]}
              inputHandler={changeEvent}
              name={input.name}
              placeholder={input.placeholder}
              classname={input.classname}
            />
          ))}

          <div className="col-xl-2">
            <Custombutton
              classname="btn btn-primary mt-4"
              type="submit"
              text={isEdit ? "Update Todo" : "Create Todo"}
            />
          </div>
        </div>
      </form>
    </div>
  );
};
