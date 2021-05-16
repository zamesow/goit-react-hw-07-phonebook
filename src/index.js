import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import store from './redux/store';
import { Provider } from 'react-redux';
// import { myAction, myAction2 } from './redux/actions';
import './index.css';

// console.log(store);
// console.log(store.getState());

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);

// ? // note 3.  store.js -> import store from './redux/store';
// console.log(store) -> методы
// - dispatch(action) - экшины доставляет в reduser
// - getState() - ссылка на свойства state
// -> actions.js

// ? // note 5. actions.js -> import { myAction } from './redux/actions';
// - console.log(store.dispatch(myAction)); - диспатчим наш action (в лог)
// - store.dispatch(myAction) - диспатчим action
// - Лог action в reducer: {type: "@@redux/INITs.j.e.d.c.g"} - это изначальное состояние, чтобы засетить начальный state, redux сам его делает при инициализации 1 раз, потому что у нас 1 reducer

// console.log(myAction);
// console.log(myAction2(5));
// console.log(myAction2(10));
// console.log(store.dispatch(myAction));
// store.dispatch(myAction);
// import { myAction, myAction2 } from './redux/actions';

('dispatch for phonebook');

// ? // note 10. npm install react-redux
// - метод Provider обворачивает весь App и прокидывает state в контекст на любую глубину
// -- import { Provider } from 'react-redux';
// - Provider нужно передать ссылку на store={store} (store уже импортирован)

// убираем state, где его использовали и методы -> ContactForm
