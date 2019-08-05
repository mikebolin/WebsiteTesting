import { createAction, props } from '@ngrx/store';

import { TodosFilter, TodosState } from './todos.model';



    var s = [];
    var hexDigits = "0123456789abcdef";
    for (var i = 0; i < 36; i++) {
        s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
    }
    s[14] = "4";  
    s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1); 
    s[8] = s[13] = s[18] = s[23] = "-";

    var uuid = s.join("");

export const actionTodosAdd = createAction(
  '[Todos] Add',
  (name: string, id = this.uuid) => ({ name, id })
);

export const actionTodosToggle = createAction(
  '[Todos] Toggle',
  props<{ id: string }>()
);

export const actionTodosRemoveDone = createAction('[Todos] Remove Done');

export const actionTodosFilter = createAction(
  '[Todos] Filter',
  props<{ filter: TodosFilter }>()
);
