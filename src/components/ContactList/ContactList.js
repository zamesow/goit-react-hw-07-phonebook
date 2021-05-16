import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import contactActions from '../../redux/contact/contact-actions';
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

const getVisibleContacts = (contacts, filter) => {
  const normalizedFilter = filter.toLowerCase();

  return contacts.filter(
    ({ name, number }) =>
      name.toLowerCase().includes(normalizedFilter) || number.includes(filter),
  );
};

const mapStateToProps = ({ contacts, filter }) => ({
  contacts: getVisibleContacts(contacts, filter),
});

const mapDispatchToProps = dispatch => ({
  onDelete: id => dispatch(contactActions.deleteContact(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ContactList);

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
