import {without} from '/util'
import ACTION_TYPES from './ACTION_TYPES'

const reducer = (state=[], action) => {
  switch (action.type) {
    case ACTION_TYPES.TODOS_CREATE:
      if (action.payload.insertAfter == null) {
        // If no order is specified, automatically insert at the bottom.
        return [...state, action.payload.id]
      } else {
        const i = state.indexOf(action.payload.insertAfter)
        return [
          ...state.slice(0, i + 1),
          action.payload.id,
          ...state.slice(i + 1, state.length),
        ]
      }
    case ACTION_TYPES.TODOS_REMOVE:
      return without(state, action.payload.id)
    default:
      return state
  }
}

export {
  reducer,
}