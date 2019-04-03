import { ADD_TODO } from '../actions/todos'
import { ADD_GOAL } from '../actions/goals'

const notifyer = (store) => (next) => (action) => {
    if (
        action.type === ADD_GOAL
    ) {
        alert("That's a great goal!");
        return next(action)
    }

    if (
        action.type === ADD_TODO
    ) {
        alert("Don't forget to " + action.todo.name + "!");
        return next(action)
    }

    return next(action)
    
}

export default notifyer