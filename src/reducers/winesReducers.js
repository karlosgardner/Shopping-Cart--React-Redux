"use strict"
//WINE REDUCERS
export function winesReducers(state={
  wines:[]
}, action){
  switch(action.type){
    case "GET_WINES":
    // let wines = state.wines.concat(action.payload);
    // return {wines};
    return {...state, wines:[...action.payload]}
    break;
    case "POST_WINE":
    return {...state, wines:[...state.wines, ...action.payload], msg:'Saved! Click to continue', style:'success', validation:'success'}
    break;
    case "POST_WINE_REJECTED":
    return {...state, msg:'Please, try again', style:'danger', validation:'error'}
    break;
    case "RESET_BUTTON":
    return {...state, msg:null, style:'primary', validation:null}
    break;
    case "DELETE_WINE":
    // Create a copy of the current array of wines
    const currentWineToDelete = [...state.wines]
    // Determine at which index in wines array is the wine to be deleted
    const indexToDelete = currentWineToDelete.findIndex(
      function(wine){
        return wine._id == action.payload;
      }
    )
    //use slice to remove the wine at the specified index
    return {wines: [...currentWineToDelete.slice(0, indexToDelete), ...currentWineToDelete.slice(indexToDelete + 1)]}
    break;

    case "UPDATE_WINE":
    // Create a copy of the current array of wines
    const currentWineToUpdate = [...state.wines]
    // Determine at which index in wines array is the wine to be deleted
    const indexToUpdate = currentWineToUpdate.findIndex(
      function(wine){
        return wine._id === action.payload._id;
      }
    )
    // Create a new wine object with the new values and with the same array index of the item we want to replace. To achieve this we will use ...spread 
    const newWineToUpdate = {
      ...currentWineToUpdate[indexToUpdate],
      title: action.payload.title
    }
    // This Log has the purpose to show you how newWineToUpdate looks like
    console.log("what is it newWineToUpdate", newWineToUpdate);
    //use slice to remove the wine at the specified index, replace with the new object and concatenate witht he rest of items in the array
    return {wines: [...currentWineToUpdate.slice(0, indexToUpdate), newWineToUpdate, ...currentWineToUpdate.slice(indexToUpdate + 1)]}
    break;
  }
  return state
} 
