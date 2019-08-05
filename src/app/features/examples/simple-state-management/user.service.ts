import { Injectable } from '@angular/core';
import { Model, ModelFactory } from '@angular-extensions/model';
import { Observable } from 'rxjs';

    var s = [];
    var hexDigits = "0123456789abcdef";
    for (var i = 0; i < 36; i++) {
        s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
    }
    s[14] = "4";  
    s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1); 
    s[8] = s[13] = s[18] = s[23] = "-";

    var uuid = s.join("");

const INITIAL_DATA: User[] = [
  { id: this.uuid, username: 'rockets', name: 'Elon', surname: 'Musk' },
  { id: this.uuid, username: 'investing', name: 'Nassim', surname: 'Taleb' },
  { id: this.uuid, username: 'philosophy', name: 'Yuval', surname: 'Harari' }
];

@Injectable()
export class UserService {
  private model: Model<User[]>;

  users$: Observable<User[]>;

  constructor(private modelFactory: ModelFactory<User[]>) {
    this.model = this.modelFactory.create([...INITIAL_DATA]);
    this.users$ = this.model.data$;
  }

  addUser(user: Partial<User>) {
      var s = [];
    var hexDigits = "0123456789abcdef";
    for (var i = 0; i < 36; i++) {
        s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
    }
    s[14] = "4";  
    s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1); 
    s[8] = s[13] = s[18] = s[23] = "-";
    var uuid = s.join("");

    const users = this.model.get();

    users.push({ ...user, id: uuid } as User);

    this.model.set(users);
  }

  updateUser(user: User) {
    const users = this.model.get();

    const indexToUpdate = users.findIndex(u => u.id === user.id);
    users[indexToUpdate] = user;

    this.model.set(users);
  }

  removeUser(id: string) {
    const users = this.model.get();

    const indexToRemove = users.findIndex(user => user.id === id);
    users.splice(indexToRemove, 1);

    this.model.set(users);
  }
}

export interface User {
  id: string;
  username: string;
  name: string;
  surname: string;
}
