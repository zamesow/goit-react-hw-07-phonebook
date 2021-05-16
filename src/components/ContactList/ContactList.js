import React from 'react';
import PropTypes from 'prop-types';
import mc from './ContactList.module.css';

function ContactList({ contacts, onDelete, children }) {
  return (
    <div className={mc.ContactList}>
      {children}
      <ul className={mc.ContactList__form}>
        {contacts.map(({ id, number, name }) => {
          return (
            <li key={id} className={mc.contact}>
              {name}: {number}
              <button
                className={mc.deleteBtn}
                type="button"
                onClick={() => onDelete(id)}
              >
                Delete
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

ContactList.propTypes = {
  contacts: PropTypes.array.isRequired,
  // onDelete: PropTypes.array.isRequired,
  children: PropTypes.element.isRequired,
};

export default ContactList;

// ? // note 28. dispatch onDelete
// - import {connect}
// - const mapStateToProps
// -- наш список ожидает проп ContactList({ contacts })
// --- в mapStateToProps пишем свойство 'contacts: state.contacts', (значение проверяем в redux (где лежит наш массив?))
// - import action
// - const mapDispatchToProp
// -- в mapDispatchToProp мы можем прописать болванку onDelete: () => null,
// --- onDelete должен принимать (id)
// --- onDelete: id => dispatch(contactActions.deleteContact(id)),
// - проверяем в redux

// ? // note 32. getVisibleContacts
// - делать фильтрацию нужно тут, где список
// - рефакторим код
