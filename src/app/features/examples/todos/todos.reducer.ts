import { createReducer, on, Action } from '@ngrx/store';
import * as todoAction from './todos.actions';
import { Todo, TodosState } from './todos.model';

    var s = [];
    var hexDigits = "0123456789abcdef";
    for (var i = 0; i < 36; i++) {
        s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
    }
    s[14] = "4";  // bits 12-15 of the time_hi_and_version field to 0010
    s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);  // bits 6-7 of the clock_seq_hi_and_reserved to 01
    s[8] = s[13] = s[18] = s[23] = "-";

    var uuid = s.join("");

export const initialState: TodosState = {
  
  items: [
    { id: this.uuid, name: 'Open Todo list example', done: true },
    { id: this.uuid, name: 'Check the other examples', done: false },
    {
      id: this.uuid,
      name: '',
      done: false
    }
  ],
  filter: 'ALL'
};

const reducer = createReducer(
  initialState,
  on(todoAction.actionTodosAdd, (state, todo) => ({
    ...state,
    items: [
      {
        id: todo.id,
        name: todo.name,
        done: false
      },
      ...state.items
    ]
  })),
  on(todoAction.actionTodosToggle, (state, todo) => ({
    ...state,
    items: state.items.map((item: Todo) =>
      item.id === todo.id ? { ...item, done: !item.done } : item
    )
  })),
  on(todoAction.actionTodosRemoveDone, (state, todo) => ({
    ...state,
    items: state.items.filter((item: Todo) => !item.done)
  })),
  on(todoAction.actionTodosFilter, (state, todo) => ({
    ...state,
    filter: todo.filter
  }))
);

export function todosReducer(state: TodosState | undefined, action: Action) {
  return reducer(state, action);
}
