import React, { useEffect, useState } from "react";
import axios from "axios";

import Bubbles from "./Bubbles";
import ColorList from "./ColorList";

import axiosWithAuth from './../helpers/axiosWithAuth';

const BubblePage = () => {
  const [colorList, setColorList] = useState([]);

  useEffect(() => {
    fetchColors();
  }, [])

  function fetchColors () {
    axiosWithAuth()
    .get('/api/colors')
    .then(res => {
      console.log('GET api/colors',res.data);
      setColorList(res.data);
    })
    .catch(err => {
      console.log(err);
    })
  };

  return (
    <>
      <ColorList colors={colorList} updateColors={setColorList} />
      <Bubbles colors={colorList} />
    </>
  );
};

export default BubblePage;

//Task List:
//1. Make an axios call to retrieve all color data and push to state on mounting.
