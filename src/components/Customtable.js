import React from "react";
import { Custombutton } from "./Custombutton";
import { Custominput } from "./Custominput";
export const Customtable = ({ handleClick, headers, data }) => {
  console.log(data, headers);
  return (
    <table className="table table-bordered">
      <thead>
        <tr>
          {headers?.map((header) => {
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
      <tbody>
        {data &&
          data.map((todo, index) => {
            return (
              <tr key={index}>
                {headers.map((val) => {
                  const { label } = val;
                  if (val?.label == "action") {
                    return (
                      <td>
                        {val?.buttons?.indexOf("edit") !== -1 ? (
                          <Custombutton
                            classname="btn btn-primary btn-sm"
                            handleClick={handleClick}
                            text="Edit"
                            todo={todo}
                          />
                        ) : (
                          ""
                        )}
                        {val?.buttons?.indexOf("delete") !== -1 ? (
                          <Custombutton
                            classname="btn btn-danger btn-sm ml-1"
                            handleClick={handleClick}
                            text="Delete"
                            todo={todo}
                          />
                        ) : (
                          ""
                        )}
                      </td>
                    );
                  } else if (val?.label == "input") {
                    return (
                      <Custominput
                        type={val?.inputData?.type}
                        value={todo?.id}
                        inputHandler={val?.inputData?.inputHandler}
                        name={`todo_${index}`}
                        todo={todo}
                      />
                    );
                  } else if (val?.label == "status") {
                    return (
                      <td>
                        {todo?.isCompleted ? (
                          <span className="p-2">Completed</span>
                        ) : todo?.isPending ? (
                          <span className="p-2">Pending</span>
                        ) : (
                          ""
                        )}
                      </td>
                    );
                  } else {
                    return <td>{todo[label] ? todo[label] : "not found"}</td>;
                  }
                })}
              </tr>
            );
          })}
      </tbody>
    </table>
  );
};
