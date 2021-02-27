import React, { useState } from "react";
// import axios from "axios";
import EditMenu from './EditMenu';
import axiosWithAuth from "../helpers/axiosWithAuth";

const initialColor = {
  color: "",
  code: { hex: "" }
};

const ColorList = ({ colors, updateColors }) => { //deconstructing props
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);

  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };

  const saveEdit = e => {
    e.preventDefault();

    axiosWithAuth()
    .put(`/api/colors/${colorToEdit.id}`, colorToEdit) // updating color we want to edit
    .then(res => {
      // create new color list
      const newColorList = colors.map(color => {
        if (color.id === colorToEdit.id) {
          return(res.data);
        } else {
          return(color);
        }
      });
      // update color 
      updateColors(newColorList);

    })
    .catch(err => {
      console.log(err);
    })

  };

  const deleteColor = color => {
    axiosWithAuth()
    .delete(`/api/colors/${color.id}`)
    .then(res => {
      console.log('deleting color with id:',res.data);
      // create new color list
      const updatedColors = colors.filter(color => {
        return (JSON.stringify(color.id) !== res.data);
      });

      updateColors(updatedColors);

    })
    .catch(err => {
      console.log(err);
    })
  };

  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors.map(color => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span className="delete" onClick={e => {
                    e.stopPropagation();
                    deleteColor(color)
                  }
                }>
                  x
              </span>{" "}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      { editing && <EditMenu colorToEdit={colorToEdit} saveEdit={saveEdit} setColorToEdit={setColorToEdit} setEditing={setEditing}/> }

    </div>
  );
};

export default ColorList;

//Task List:
//1. Complete the saveEdit functions by making a put request for saving colors. (Think about where will you get the id from...)
//2. Complete the deleteColor functions by making a delete request for deleting colors.