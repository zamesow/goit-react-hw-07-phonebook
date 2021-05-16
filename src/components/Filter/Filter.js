import React from 'react';
import { connect } from 'react-redux';
import contactActions from '../../redux/contact/contact-actions';
import mc from './Filter.module.css';

const Filter = ({ value, filterProp }) => (
  <label className={mc.ContactForm}>
    Find contacts by name
    <input
      className={mc.FeilterForm__text}
      type="text"
      value={value}
      onChange={filterProp}
    />
  </label>
);

const mapStateToProps = state => ({
  value: state.filter,
});

const mapDispatchToProps = dispatch => ({
  filterProp: e => dispatch(contactActions.changeFilter(e.target.value)),
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
