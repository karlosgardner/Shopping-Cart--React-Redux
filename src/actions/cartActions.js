"use strict"
import axios from 'axios';
// GET CART
export function getCart(){
  return function(dispatch){
    axios.get('/api/cart')
     .then(function(response){
       dispatch({type:"GET_CART", payload:response.data})
     })
     .catch(function(err){
       dispatch({type:"GET_CART_REJECTED", msg:"error when getting the cart from session"})
     })
  }
}
// ADD TO CART
export function addToCart(cart){
  return function(dispatch){
    axios.post("/api/cart", cart)
      .then(function(response){
        dispatch({type:"ADD_TO_CART", payload:response.data})
      })
      .catch(function(err){
        dispatch({type:"ADD_TO_CART_REJECTED", msg: 'error when adding to the cart'})
      })
  }
}
// UPDATE CART
export function updateCart(_id, unit, cart){
  // Create a copy of the current array of wines
  const currentWineToUpdate = cart
  // Determine at which index in wines array is the wine to be deleted
  const indexToUpdate = currentWineToUpdate.findIndex(
    function(wine){
      return wine._id === _id;
    }
  )

  const newWineToUpdate = {
    ...currentWineToUpdate[indexToUpdate],
    quantity: currentWineToUpdate[indexToUpdate].quantity + unit
  }

  let cartUpdate = [...currentWineToUpdate.slice(0, indexToUpdate), newWineToUpdate, ...currentWineToUpdate.slice(indexToUpdate + 1)]

  return function(dispatch){
    axios.post("/api/cart", cartUpdate)
      .then(function(response){
        dispatch({type:"UPDATE_CART", payload:response.data})
      })
      .catch(function(err){
        dispatch({type:"UPDATE_CART_REJECTED", msg: 'error when adding to the cart'})
      })
  }
}
// DELETE FROM CART
export function deleteCartItem(cart){
  return function(dispatch){
    axios.post("/api/cart", cart)
      .then(function(response){
        dispatch({type:"DELETE_CART_ITEM", payload:response.data})
      })
      .catch(function(err){
        dispatch({type:"DELETE_CART_ITEM_REJECTED", msg: 'error when deleting an item from the cart'})
      })
  }
}
