import React from 'react';
import { connect } from 'react-redux';
import { contactsOperations } from '../../redux/contact';
import mc from './Filter.module.css';

const Filter = ({ value, filter }) => (
  <label className={mc.ContactForm}>
    Find contacts by name
    <input
      className={mc.FeilterForm__text}
      type="text"
      value={value}
      onChange={filter}
    />
  </label>
);

const mapStateToProps = state => ({
  value: state.filter,
});

const mapDispatchToProps = dispatch => ({
  filter: e => dispatch(contactsOperations.changeFilter(e.target.value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Filter);

// ? // note 31. filter
// - mapStateToProps
// -- value: state.filter,
// - import action
// -- mapDispatchToProps
// -- filterProp: e => dispatch(contactActions.changeFilter(e.target.value)),
// - import {connect}
// -- export default connect(mapStateToProps, mapDispatchToProps)(Filter);
