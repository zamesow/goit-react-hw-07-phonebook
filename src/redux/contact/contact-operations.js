import axios from 'axios';
import {
  fetchContactReqest,
  fetchContactSuccess,
  fetchContactError,
  addContactReqest,
  addContactSuccess,
  addContactError,
  deleteContactReqest,
  deleteContactSuccess,
  deleteContactError,
} from './contact-actions';

axios.defaults.baseURL = 'http://localhost:4040';

const fetchContacts = () => async dispatch => {
  dispatch(fetchContactReqest());

  try {
    const { data } = await axios.get('/contacts');

    dispatch(fetchContactSuccess(data));
  } catch (error) {
    dispatch(fetchContactError(error));
  }

  // axios.get('/todos').then(({ data }) => dispatch(fetchContactSuccess(data)));
};

const addContacts = ({ name, number }) => async dispatch => {
  const contact = {
    name,
    number,
  };

  dispatch(addContactReqest());

  try {
    const { data } = await axios.post('/contacts', contact);

    dispatch(addContactSuccess(data));
  } catch (error) {
    dispatch(addContactError(error));
  }
};

const deleteContacts = id => async dispatch => {
  dispatch(deleteContactReqest());

  try {
    const { data } = await axios.delete(`/contacts/${id}`);

    dispatch(deleteContactSuccess(data));
  } catch (error) {
    dispatch(deleteContactError(error));
  }
};

export default { fetchContacts, addContacts, deleteContacts };

// * ДЗ-7 ============================================

// ? // note HW-7-2

// импортируем axios
// импортируем экшины кроме фильтра
// - задаём дэфолтный url
// - создаём санк для fetch

// экспортируем дэфолтно все axios
// изменяем в компонентах импорты contactActions на contactOperations
