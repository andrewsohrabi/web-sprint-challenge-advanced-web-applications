import React from 'react';
import axiosWithAuth from '../helpers/axiosWithAuth';

export function fetchColors () {
    axiosWithAuth()
    .get('/api/colors')
    .then(res => {
      return res.data;
    })
  };