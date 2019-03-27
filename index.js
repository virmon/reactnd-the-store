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
/**
 *  Reducer (must be pure function)
 *  @param {array} state
 *  @param {string} action
 */ 
function todos (state = [], action) {
    if(action.type === 'ADD_TODO') {
        return state.concat(action.todo)
    }

    return state
}

/** must pass a reducer function when invoked */
const store = createStore(todos)

/** listens to state changes */
store.subscribe(() => {
    console.log("The new state is: ", store.getState())
})

/** update the state */
store.dispatch({
    type: 'ADD_TODO',
    todo: {
        id: 0,
        name: 'Learn Redux',
        complete: false
    }
})

