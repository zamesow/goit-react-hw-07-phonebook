import React, { Component } from 'react';
import { connect } from 'react-redux';
import contactActions from '../../redux/contact/contact-actions';
import mc from './ContactForm.module.css';

export class ContactForm extends Component {
  state = {
    name: '',
    number: '',
  };

  handleNameChange = e => {
    const { value } = e.currentTarget;
    this.setState({ name: value });
  };

  handleNumberChange = e => {
    const { value } = e.currentTarget;
    this.setState({ number: value });
  };

  handleSubmit = e => {
    e.preventDefault();

    this.props.onSubmit(this.state);

    this.reset();
  };

  reset = () => {
    this.setState({ name: '', number: '' });
  };

  render() {
    const { name, number } = this.state;
    // const { handleNumberChange, handleNameChange } = this.props;

    return (
      <div className={mc.ContactForm}>
        <form className={mc.ContactForm__form} onSubmit={this.handleSubmit}>
          <label className={mc.ContactForm__subtitle}>
            Name
            <input
              className={mc.ContactForm__text}
              type="text"
              value={name}
              onChange={this.handleNameChange}
            />
          </label>
          <label className={mc.ContactForm__subtitle}>
            Number
            <input
              className={mc.ContactForm__text}
              type="text"
              value={number}
              onChange={this.handleNumberChange}
            />
          </label>
          <button type="submit">Add contact</button>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  onSubmit: state => dispatch(contactActions.addContact(state)),
});

export default connect(null, mapDispatchToProps)(ContactForm);

// ? // note 11. connect()()
// - убираем state и методы связанные с ним
// - убираем класс и делаем ф-цию с нашей разметкой
// - import { connect } from 'react-redux';
// - делаем 2й export default connect()(ContactForm);
// -- connect() - мы передаём туда опции для связи компонента и redux-хранилища mapStateToProps
// -- потом connect() возвращает на своё место ещё одну ф-цию, которая ожидает компонент и настройки, которые мы передадим в ContactForm, чтоб их связать
// --- эта запись идентична const a = x => y => x + y;
// --- или a = x => { return y => { return x + y } };
// --- или a(2)(3); // 5
// - не коннектить один родитель, прокидывая всё вглубь, коннектить каждый компонент, которому что-то нужно (в разумных пределах, счётчику counter не подключать каждый маленький кусочек к store, подключать один counter и кинуть на один уровень вложности, а коллекции типа to-do подключать отдельно коллкции, формы, статистику и т.п.)

// ? // note 12. mapStateToProps
// - функция получает весь наш state, а возвращает назначенные нами свойства, которые станут пропсами компонента
// -- return { nameProp: state.name, numberProp: state.number };
// -- state.name и state.number - это те, что записаны в store, но мы можем добавить новые свойства
// -- изменится state - изменится prop - перерендерится компонент
// -- передаём connect(mapStateToProps), теперь функции ContactForm() переданы все пропсы, но в формах value={state.name} и value={state.number}, потому что это динамика, а не значения изначального state
// ** не нужен в домашке

// ? // note 13. mapDispatchToProps
// - в его параметр приходит весь dispatch
// - а возвращает объект с пропсами, значения которых будут ф-ции, которые будут диспатчить action
// -- import * as actions - импортируем все экспорты как локальный объект actions и вызываем как функции
// --- { handleNameChange: () => dispatch(actions.addName()),
// --- handlePhoneChange: () => dispatch(actions.addNumber()), }
// -- закидываем нашу функцию тоже в connect()
// --- connect(mapStateToProps, mapDispatchToProps)(ContactForm);
// --- деструктуризируем свойства в ContactForm({}) вместе с другими пропсами
// --- подставляем нужный проп в свой onChange={handleNameChange} и value={nameProp}
// -> store

// ? // note 27. dispatch onSubmit
// - чтобы форма заполнялась, не нужно удялять месный state и методы связанные с ним
// - этому state нет места в redux, потому что он используется только тут
// - нам нужно засабмитить в state redux данные с помощью // * mapDispatchToProps
// -- импортируем contactActions
// -- импорт {connect}
// - нам не нужен стейт в этом классе, а только проп onSubmit
// - не используем mapStateToProps, поэтому null, пишем connect(null, mapDispatchToProps)

// -- const mapDispatchToProps = dispatch => ({
// --- onSubmit: state => dispatch(contactActions.addContact(state)) });
// --- onSubmit - такой проп ожидает // * handleSubmit = e => { this.props.onSubmit(this.state); }
// --- мы диспатчим state в contactActions.addContact(state) - это тот state из this.props.onSubmit(this.state)
// - проверяем в redux devtools -> state

// * старое

// const mapStateToProps = state => {
//   console.log('ContactForm:', state);
//   return {
//     nameProp: 'state.rootReducer.name',
//     numberProp: 'state.rootReducer.number',
//   };
// };

// state = {
//   name: '',
//   number: '',
// };

// handleNameChange = e => {
//   const { value } = e.currentTarget;
//   this.setState({ name: value });
// };

// handlePhoneChange = e => {
//   const { value } = e.currentTarget;
//   this.setState({ number: value });
// };

// handleSubmit = e => {
//   e.preventDefault();

//   this.props.onSubmitProp(this.state);

//   this.reset();
// };

// reset = () => {
//   this.setState({ name: '', number: '' });
// };
