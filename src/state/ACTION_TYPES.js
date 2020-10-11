const ACTION_TYPES = {

  /*
    workspace namespace
  */
  WORKSPACE__SET_ACTIVE_LIST: 'todo-2020/workspace/SET_ACTIVE_LIST',

  /*
    lists namespace
  */
  LISTS__CREATE: 'todo-2020/lists/CREATE',
  LISTS__ADD_TODO: 'todo-2020/lists/CREATE',

  /*
    todos namespace
  */
  // ::TODO:: Rename using TODOS__ namespace.
  TODOS_CREATE: 'todo-2020/todos/CREATE',
  TODOS_REMOVE: 'todo-2020/todos/REMOVE',
  TODOS_UPDATE: 'todo-2020/todos/UPDATE',
  TODOS_TOGGLE: 'todo-2020/todos/TOGGLE',
  TODOS_MERGE:  'todo-2020/todos/MERGE',

}

export default ACTION_TYPES
