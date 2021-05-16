import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import reducers from './contact/contact-reducer';

const middleware = [...getDefaultMiddleware(), logger];

const store = configureStore({
  reducer: {
    contacts: reducers.contact,
    filter: reducers.filter,
  },
  middleware,
  // eslint-disable-next-line no-undef
  devTools: process.env.NODE_ENV === 'development',
});

export default store;

('---');
// ? // note 2. import { createStore } from 'redux';
// - const reduser - ф-ция, что принимает предыдущее состояние (например state = {a: 5, b: 15}) и действие, возвращает новое состояние [prevState + action = newState]
// - const store
// - export default store; -> index.js

// createStore(reducer, preloadedStore, enhancer);
// preloadedStore - начальное состояние, например {a: 10}, можно из localStorage взять инфу и закинуть в него [дополнительный параметр]
// enhancer - улучшайзер, обработчик действий до попадания в reducer [дополнительный параметр]

// ? // note 6. проверка доставки action to reduce
// - чтобы убедиться, что наш action доставлен в reducer нужно залогировать его до возврата нового state
// -- const reducer = (state = initialState, action) => { console.log('Лог action в reducer:', action);
//   return state; };

('reducer for phonebook');

// ? // note 9. reducer
// - задаём дэфолтное(предыдущее) значение для initialState
// - делаем switch с разными кейсами, определяем по свойству (action.type)
// - если ни один из кейсов не подойдёт, прописываем default: return
// - возвращаем в кейсе с именем новое значение = action.payload
// - то же и с contactForm/Number
// - деструктуризируем action на {type, payload}
// - тут использовать можно все методы, что использовались с state (.map, .filter)

// связываем нашу логику с компонентами -> index

// ContactForm ->
// ? // note 14. мы работаем от предыдущего, поэтому будем распылять свойства state
// - распылять надо сначала { ...state, counter: 1 }
// - если значение свойства объект, то распыляем и его {...state, counter: { ...state.counter, value: state.counter.value + payload }}
// -- делаем это у каждого кейса
// -- проверяем, чтобы в ContactForm -> mapStateToProps -> правильно сошлись пути значения пропсов

// ? // note 15. после установки devtools
// - добавляем настройки прослоек (стек функций между action и reducer)
// -- import { createStore, applyMiddleware } from 'redux';
// -- import { composeWithDevTools } from 'redux-devtools-extension';
// --- прописываем после createStore(reducer, composeWithDevTools(...));
// ---- в ... мы передаём applyMiddleware(...middleware)
// ---- если middleware нет, передаём пустой массив applyMiddleware([])
// --- или пустые тулзы createStore(reducer, composeWithDevTools());

// ? // note 16. combineReducers ['RN18/9', '01:09:30'];
// - import { combineReducers } from 'redux';
// -- за разные свойства могут отвечать разные reducers
// -- создаём переменную с отдельным объектом нашего стейта, чтобы в будущем использовать только этот кусочек
// -- прописываем handleDataReducer специально для handleDataInitialState
// -- первый reducer удаляем
// -- const rootReducers = combineReducers({...}); комбинируем reducers
// -- ... = handleData: handleDataReducer, какое есть свойство в state и какой метод за него отвечает

// ? // note 17. дробим дальше ['RN18/9', '01:16:00'];
// - можно каждому свойству свой reducer

// ? // note 18. отдельная папка под все события и действия элемента
// - redux/contact - это namespace
// - redux/contact/contact-actioons.js
// -- переносим всё из actions.js
// -- меняем адрес импорта в ContactForm
// - contact-reducer.js ->
// -- переносим туда reducer по имени и номеру
// -- импортируем reducer из contact-reducer.js
// -- объединяем тут с rootReducer
// -- его и закидываем в createStore(rootReducer)

// ? // note 24. rootReducer
// - import reducers
// - связываем свойства state с помощью combineReducers({
// - contacts: reducers.contact,
// - filter: reducers.filter, })

// ? // note 33. Redux Toolkit [RN18/10]
// - npm install @reduxjs/toolkit
// -- меняем import { createStore } from 'redux';
// -- на import { configureStore } from '@reduxjs/toolkit';
// --- теперь в store передаётся не ссылка, а объект настроек с обязательным свойством reducer:
// --- devTools: false, пишем, если надо отключить, они теперь всегда включены
// ---- но они не нужны в продакшине, поэтому включить их можно при условии { devTools: process.env.NODE_ENV === 'development' }
// - если в reducer: {} передать сразу объект свойств, то combineReducers не нужен, он есть под капотом и сам всё обернёт

// ? // note 34. стек прослоек middleware
// - прослойки middleware - это набор ф-ций на пути action когда он диспатчится до reducer
// - это именно стек и у него есть очерёдность
// -- они вспомогательные и есть много готовых: redux - logger(логирует action в консоль)
// --  npm i --save redux-logger
// -- есл нужно показать дополнительные прослойки, то нужно подключить настройки дефолтных мидлваров
// --- import {getDefaultMiddleware} from '@reduxjs/tooolkit';
// --- подключаем доп. мидлвар import logger from 'redux-logger';
// ---- запускаем и распушиваем дефолтные мидлвары, а потом доп.
// ---- const middleware = [...getDefaultMiddleware(), logger];
// -- передаём ссылку на мидлвары как значение свойства middleware в store
// -- проверяем консоль при фильтрации

// ***
// выносим отдельно , папку contact и всё, что с ним связано
// константы types

//  * старое
/*
const reducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case 'contactForm/Name':
            return { ...state, handleData: { ...state.handleData, name: payload} };
            
        case 'contactForm/Number':
            return { ...state, handleData: { ...state.handleData, number: payload } };
                
        default:
            return state;
    }
};
*/
