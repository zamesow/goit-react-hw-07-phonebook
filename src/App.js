import React, { Component } from 'react';
import ContactForm from './components/ContactForm';
import ContactList from './components/ContactList';
import Filter from './components/Filter';
import mc from './App.module.css';

class App extends Component {
  render() {
    return (
      <>
        <h1 className={mc.title}>Phonebook</h1>
        <ContactForm onSubmit={this.formSubmitHandler} />

        <h2 className={mc.title}>Contacts</h2>
        <ContactList>
          <Filter />
        </ContactList>
      </>
    );
  }
}

export default App;

// ? npm install redux
// https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd
// npm install --save-dev redux-devtools-extension [01:03:00]
// - redux - это либа управления состояниями, там хранят коллекции данных, которые нужны глобально
// - при обновлении state все компоненты получают новые пропсы
// - state выносится отдельно
// - не нужно перекидывать state и props, всё хранится в одном месте

// ? // note 1. store (хранилище) - обычный js-объект
// - создаём папку src/redux (вся логика приложения будет храниться тут)
// -- redux/store.js -> ...

// ? // note 25. убираем лишнее
// - componentDidMount
// - componentDidUpdate
// - localStorage
// - state = { contacts, filter }
// -- если в state есть что-то для UI, то оставляем это, а работа с коллекцией уезжает в redux
// - filter можно временно отключить
// * formSubmitHandler
// * убираем App -> deleteContact и рендерим
// -- раньше он получал пропсы из App, а теперь будет брать из redux
// -- удаляем пропсы contacts и onDelete
// -> ContactList
// *- getVisibleContacts
// - делаем в -> ContactList

// ? // note 26. проверка submit
// - нужно проверить сабмитится ли наша форма
// - наша форма - это action с types.ADD и с payload всех свойств контакта
// - для этого нужно связать форму и action
// -> ContactForm

// * старое
// state = {
//   contacts: [
//     { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
//     { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
//     { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
//     { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
//   ],
//   filter: '',
// };

// запись в state из localStorage
// componentDidMount() {
//   const contacts = localStorage.getItem('contacts');
//   const parsedContacts = JSON.parse(contacts);

//   if (parsedContacts) {
//     this.setState({ contacts: parsedContacts });
//   }
// }

// запись в localStorage
// componentDidUpdate(prevProps, prevState) {
//   if (prevState.contacts !== this.state.contacts) {
//     localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
//   }
// }

// formSubmitHandler = data => {
//   const { name, number } = data;
//   const { contacts } = this.state;

//   if (data.name.length === 0) {
//     alert('Введите имя');
//   } else if (data.number.length === 0) {
//     alert('Введите номер телефона');
//   } else if (
//     contacts.find(
//       contact => contact.name.toLocaleLowerCase() === name.toLowerCase(),
//     )
//   ) {
//     alert(`${data.name} is already in contacts.`);
//   } else if (contacts.find(contact => contact.number === number)) {
//     alert(`${number} is already in contacts.`);
//   } else {
//     this.setState(prevState => ({
//       contacts: [
//         {
//           ...data,
//           id: shortid.generate(),
//         },
//         ...prevState.contacts,
//       ],
//     }));
//   }
// };
