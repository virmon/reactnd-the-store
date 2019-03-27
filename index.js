// Library code
/** @description The Store 
 *  @param {function} reducer
 */
function createStore(reducer) {
    /** 
     * The store should have four parts
     * 1. The state
     * 2. Get the state
     * 3. Listen to changes on state
     * 4. Update the state
    */

    let state
    let listeners = []

    /** used to get the current state from the store */
    const getState = () => state

    /** used to provide a listener function the store will call when the state changes */
    const subscribe = (listener) => {
        listeners.push(listener)
    }

    /** used to make changes to the store state */
    const dispatch = (action) => {
        state = reducer(state, action)
        listeners.forEach(listener => listener())
    }

    return {
        getState,
        subscribe,
        dispatch
    }
}

// App code
const ADD_TODO = 'ADD_TODO'
const REMOVE_TODO = 'REMOVE_TODO'
const TOGGLE_TODO = 'TOGGLE_TODO'
const ADD_GOAL = 'ADD_GOAL'
const REMOVE_GOAL = 'REMOVE_GOAL'
/**
 *  Reducer (must be pure function)
 *  @param {array} state
 *  @param {string} action
 */ 
function todos (state = [], action) {
    switch(action.type) {
        case 'ADD_TODO' :
            return state.concat([action.todo])
        case 'REMOVE_TODO' :
            return state.filter((todo) => todo.id !== action.id)
        case 'TOGGLE_TODO' :
            return state.map((todo) => todo.id !== action.id ? todo :
                Object.assign({}, todo, { complete: !todo.complete }))
        default :
            return state
    }
}

function goals (state = [], action) {
    switch(action.type) {
        case 'ADD_GOAL' :
            return state.concat([action.goal])
        case 'REMOVE_GOAL' :
            return state.filter((goal) => goal.id !== action.id)
        default :
            return state
    }
}

/** rootReducer */
function app (state = {}, action) {
    return {
        todo: todos(state.todos, action),
        goal: goals(state.goals, action)
    }
}

/** must pass a reducer function when invoked */
const store = createStore(app)

/** listens to state changes */
store.subscribe(() => {
    console.log("The new state is: ", store.getState())
})

/** update the state */
store.dispatch({
  type: ADD_TODO,
  todo: {
    id: 0,
    name: 'Walk the dog',
    complete: false,
  }
})

store.dispatch({
  type: ADD_TODO,
  todo: {
    id: 1,
    name: 'Wash the car',
    complete: false,
  }
})

store.dispatch({
  type: ADD_TODO,
  todo: {
    id: 2,
    name: 'Go to the gym',
    complete: true,
  }
})

store.dispatch({
  type: REMOVE_TODO,
  id: 1
})

store.dispatch({
  type: TOGGLE_TODO,
  id: 0
})

store.dispatch({
  type: ADD_GOAL,
  goal: {
    id: 0,
    name: 'Learn Redux'
  }
})

store.dispatch({
  type: ADD_GOAL,
  goal: {
    id: 1,
    name: 'Lose 20 pounds'
  }
})

store.dispatch({
  type: REMOVE_GOAL,
  id: 0
})

