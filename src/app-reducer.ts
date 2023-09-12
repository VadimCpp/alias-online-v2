// Define the initial state
export interface AppState {
  counter: number;
}

const initialState: AppState = {
  counter: 0,
};

// Define action types
enum ActionTypes {
  INCREMENT = 'INCREMENT',
  DECREMENT = 'DECREMENT',
}

// Define action creators
interface IncrementAction {
  type: ActionTypes.INCREMENT;
}

interface DecrementAction {
  type: ActionTypes.DECREMENT;
}

export const increment = (): IncrementAction => ({
  type: ActionTypes.INCREMENT,
});

export const decrement = (): DecrementAction => ({
  type: ActionTypes.DECREMENT,
});

// Define the reducer
type Action = IncrementAction | DecrementAction;

const appReducer = (state = initialState, action: Action): AppState => {
  switch (action.type) {
    case ActionTypes.INCREMENT:
      return {
        ...state,
        counter: state.counter + 1,
      };
    case ActionTypes.DECREMENT:
      return {
        ...state,
        counter: state.counter - 1,
      };
    default:
      return state;
  }
};

export default appReducer;
