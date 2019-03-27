// Library code
// The Store
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

    const getState = () => state

    const subscribe = (listener) => {
        listeners.push(listener)
    }

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

const store = createStore(todos)

store.subscribe(() => {
    console.log("The new state is: ", store.getState())
})

store.dispatch({
    type: 'ADD_TODO',
    todo: {
        id: 0,
        name: 'Learn Redux',
        complete: false
    }
})

const receivePost = post => ({
    type: 'RECEIVE_POST',
    post: post
})
