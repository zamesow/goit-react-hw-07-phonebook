import shortid from 'shortid';
import { createAction } from '@reduxjs/toolkit';

const addContact = createAction('contact/add', state => ({
  payload: {
    id: shortid.generate(),
    name: state.name,
    number: state.number,
  },
}));

const deleteContact = createAction('contact/delete');

const changeFilter = createAction('contact/changeFilter');

export default { addContact, deleteContact, changeFilter };

// ? // note 4. index.js -> создаём actions
// - объект с обязательными свойствами {type: '', payload: ''}
// - экспортируем его -> index.js
// - можно попробовать с myAction2

// ? // note 7. делаем action creator - фабрику экшинов - ф-цию, где параметр запишется в значение свойства

// export const myAction = {
//   type: 'MY_ACTION',
//   payload: 'super payload',
// };

// export const myAction2 = value => ({
//   type: 'MY_ACTION_2',
//   payload: value,
// });

// * actions for phonebook
// ? // note 8. создаём action для submit формы
// - type: указываем namespace - типа заглавие области, где будет выполняться action (contactForm/submit)
// - payload: будет динамическим
// - лучше под разные действия делать отдельные action
// - делаем reducer -> store

// меняем actions.js на contact-actions.js

// ? // note 22. import types
// - ставим динамические типы
// - экспортируем наш action как объект, потому что он должен распыляться в массив как объект, а не как переменная

// ? // note 28. deleteContact
// - ожидаем contactId, потому что в App -> deleteContact = contactId => {}
// -- нам нужна лишь минимальная инф. для обновления, а обновляет reducer ->
// -- export default { addContact, deleteContact };

// ? // note 29. changeFilter
// - обрабатывать будем значение
// - export default { addContact, deleteContact, changeFilter };

// ? // note 35. createAction @reduxjs/toolkit
// import { createAction } from '@reduxjs/toolkit';
// createAction(type, prepareAction?) - передаём в ф-цию //* type
// - delete
// -- const changeFilter = createAction(types.DELETE);
// --- payload тут не нужен, потому что мы и так закидываем всю ф-цию (contactId там есть, потому что мы диспатчим id из ContactList)
// - filter
// -- const changeFilter = createAction(types.CHANGE_FILTER);
// --- payload тут не нужен (value там есть итак, потому что мы диспатчим value из Filter)
// - add
// -- const changeFilter = createAction(types.ADD, prepareAction);
// --- тут сложнее, name и number есть, а генератора id нет
// --- используем 2й параметр [prepareAction] - на его место передаём ф-цию с подготовленым форматом //* payload
// --- prepare callback - preload, легко и просто использовать потом, например при вызове console.log(addContact({ name: 'Azis', number: 123 }));
// - types можо теперь не хранить, он прописываются один раз в createAction(type)

// * старое
// export const addName = value => ({
//   type: types.ADD_NAME,
//   payload: value,
// });

// export const addNumber = value => ({
//   type: types.ADD_NUMBER,
//   payload: value,
// });

// const addContact = state => ({
//   type: types.ADD,
//   payload: {
//     id: shortid.generate(),
//     name: state.name,
//     number: state.number,
//   },
// });
