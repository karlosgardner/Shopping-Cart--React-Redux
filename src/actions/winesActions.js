"use strict"
import axios from 'axios';
// GET Wine
export function getWines(){
  return function(dispatch){
    axios.get("/api/wines")
      .then(function(response){
        dispatch({type:"GET_WINES", payload:response.data})
      })
      .catch(function(err){
        dispatch({type:"GET_WINES_REJECTED", payload:err})
      })
  }
}
// POST A WINE
export function postWines(wine){
  return function(dispatch){
    axios.post("/api/wines", wine)
      .then(function(response){
        dispatch({type:"POST_WINE", payload:response.data})
      })
      .catch(function(err){
        dispatch({type:"POST_WINE_REJECTED", payload:"there was an error while posting a new wine"})
      })
  }
}

// DELETE A Wine
export function deleteWines(id){
  return function(dispatch){
    axios.delete("/api/wines/" + id)
      .then(function(response){
        dispatch({type:"DELETE_WINE", payload:id})
      })
      .catch(function(err){
        dispatch({type:"DELETE_WINE_REJECTED", payload:err})
      })
  }
}

// UPDATE A WINE
export function updateWines(wines){
  return {
          type:"UPDATE_WINE",
          payload: book
        }
}
// RESET FORM BUTTON
export function resetButton(){
  return {
          type:"RESET_BUTTON"
        }
}
