import Freezer from 'freezer-js';

const initState = {
  message: 'Hello World',
  user: {
    username: '',
    cname: '',
    ename: '',
    role: ''
  },
  students: [],
  vocabs: [],
  quizzes: [],
  ui: {
    page: 'login',
    headers: {
      authorization: ''
    }
  }
};

const state = new Freezer(initState);

export const GetState = state.get;
export const Dispatch = (type, data) => {
  state.trigger(type, data);
};
export const Subscribe = cb => state.on('update', cb);
export const TurnOff = state.off;

export function createStore (actions, reducer) {
  Object.keys(actions).map(key => {
    const action = actions[key]();
    const cb = reducer(action);

    state.on(action.type, (data) => {
      cb(state.get(), data);
    });
  });
}
