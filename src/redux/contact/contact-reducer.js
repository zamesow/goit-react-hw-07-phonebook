import { createReducer } from '@reduxjs/toolkit';
import actions from './contact-actions';

const initialState = [
  { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
  { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
  { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
  { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
];

console.log(actions.addContact.type);

const contact = createReducer(initialState, {
  [actions.addContact]: (state, { payload }) => [...state, payload],
  [actions.deleteContact]: (state, { payload }) =>
    state.filter(({ id }) => id !== payload),
});

const filter = createReducer('', {
  [actions.changeFilter]: (_, { payload }) => payload,
});

export default {
  contact,
  filter,
};

// ? // note 19. вынос actionTypes
// - если мы используем switch(type) {case 'contact/Name'}, то type лучше хранить отдельно как переменную
// -> contact-types.js
// -> contact-actions

// ? // note 20. contact-reducer
// - нужно, прописать редьюсеры для каждого свойства state
// - потом объеденить их в общее свойство-объект (если он есть) с помощью combineReducers({})
// -- import { combineReducers } from 'redux';
// -- у нас {contacts и filter} в одном
// --- делаем сначала шаблоны-болванки, чтобы легче связать
// ---- const contact = (state = [], action) => state;
// ---- const filter = (state = '', action) => state;
// --- экспортируем их в общем объекте в store ->
// ---- там связываем с помощью combineReducers({})
// ---- если есть ещё глубина, то редьюсим и связываем тут

// ? // note 21. actionTypes (удалены при redux/toolkit)
// export default { ADD: 'contact/add', DELETE: 'contact/delete',  CHANGE_FILTER: 'contact/changeFilter', }
// - писать можноо большими и маленькими
// - можно делать export каждого элемента const
// - export default {} всего объекта

// ? // note 23. contact-reduser switch-case
// - редьюсим подробно contact = (state = [], { type, payload }) => {
// -- switch(type) {
// *- case 'types.ADD':
// -- return [...state, payload];
// -- default: return state; }};
// *- case 'types.DELETE':
// -- нужно взять предыдущие контакты, отфильтровать их и выбрать не соответствующие выбранному contact.id
// --- это уже прописано в методе App -> deleteContact - contacts: contacts.filter(contact => contact.id !== contactId),
// --- наш предыдущий state = []
// ---- return state.filter(contact => contact.id !== payload);
// ---- return state.filter(({id}) => id !== payload);
// - убираем App -> deleteContact и рендерим ContactList

// ? // note 30. reducer filter
// - расписываем редьюсер фильтра

// ? // note 36. createReducer @reduxjs/toolkit
// import { createReducer } from '@reduxjs/toolkit';
// - createReducer(state, { cases }), state = [], '' или переменная
// - сначала закидываем наш state
// - потом объект кейсов
// -- type: (state, action) => return
// -- тут уже можно писать 'state' в даном случае под капотом оно понимает что это
// --- но если изначально state = '', то далее state определяется линтером, как неопределённая переменная, поэтому можно использовать _ - это не ошибка
// -- default: return прописывать не нужно, он под капотом
// -- если формулы большие, их можно выносить отдельно

// ? // note 37. types @reduxjs/toolkit
// - types тепрь не нужны, прописываем 1 раз в actions
// - import actions from './contact-actions';
// -- есть внутреннее свойство type прямо в нашей переменной и это строка
// -- console.log(actions.addContact.type) там под капотом toString()
// -- ключ у свойств объектов всегда строка, поэтому пишем [actions.addContact]:

// ? // note 38. total-completed-reduce @reduxjs/toolkit
// - эти опции есть в to-do Stats и используются для mapStateToProps
// - коннектим Stats
// * Вариант-1
// - { total: state.todos.items.length
// -   completed: state.todos.items.reduce((total, todo) => (todo.completed ? total + 1 : total), 0) }
// * Вариант-2
// - const getCompletedTodosCount = todos => todos.reduce((total, todo) => (todo.completed ? total + 1 : total), 0);
// - completed: getCompletedTodosCount(state.todos.items)
// reduce проверяет все todo на [comleted: true] и от total=0 делает +1 или выдыёт их total

// ***
// const filterReducer = combineReducers({
//   filter,
// });

// *
// const contactHandleInitialState = {
//   name: '',
//   number: '',
// };

// const contactHandleReducer = (
//   state = contactHandleInitialState,
//   { type, payload },
// ) => {
//   switch (type) {
//     case 'contactForm/Name':
//       return { name: payload };

//     case 'contactForm/Number':
//       return { number: payload };

//     default:
//       return state;
//   }
// };

// export default combineReducers({
//   handleContact: contactHandleInitialState,
// });

// const contact = (state = initialState, { type, payload }) => {
//   switch (type) {
//     case types.ADD:
//       return [...state, payload];

//     case types.DELETE:
//       return state.filter(({ id }) => id !== payload);

//     default:
//       return state;
//   }
// };

// const filter = (state = '', { type, payload }) => {
//   switch (type) {
//     case types.CHANGE_FILTER:
//       return payload;

//     default:
//       return state;
//   }
// };
