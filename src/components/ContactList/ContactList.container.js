import { connect } from 'react-redux';
import { contactsOperations } from '../../redux/contact';
import ContactList from './ContactList';

const getVisibleContacts = (items, filter) => {
  console.log(items);
  const normalizedFilter = filter.toLowerCase();

  return items.filter(
    ({ name, number }) =>
      name.toLowerCase().includes(normalizedFilter) || number.includes(filter),
  );
};

const mapStateToProps = ({ contacts: { items, filter } }) => ({
  contacts: getVisibleContacts(items, filter),
});

const mapDispatchToProps = dispatch => ({
  onDelete: id => dispatch(contactsOperations.deleteContact(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ContactList);
