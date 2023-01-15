import  { useState, useEffect } from 'react';
import { Forma } from './Forma/Forma';
import { Container } from './App.styled';
import { Contact } from './Contact/Contact';
import { Filter } from './Filter/Filter';
import { nanoid } from 'nanoid';

const contactList = [
  { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
  { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
  { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
  { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
];

export const App = () => {
  const [contacts, setContacts] = useState(() => {
    return JSON.parse(localStorage.getItem('contacts')) ?? contactList;
  });
  const [filter, setFilter] = useState('');
 

 const handlFormSubmit = ( name, number ) => {
    
    let newContact = {
      id: nanoid(),
      name,
      number,
    };
    if (contacts.find(contact => contact.name === name)) {
      alert(`${name} is already in contacts.`);
      return;
    }
    setContacts(prevState => [newContact, ...prevState],
    );
  };
  const handlDeleteContact = id => {
    setContacts(prevState =>  prevState.filter(contact => contact.id !== id),
    );
  };
  const handlChangeFilter = e => {
    setFilter(e.currentTarget.value );
  };
  const handlFilterContacts = () => {
    
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };
  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  },[contacts]);
  

 
    
    return (
      <Container>
        <h1>Phonebook</h1>
        <Forma onSubmit={handlFormSubmit} />
        <h2>Contacts</h2>
        <Filter filter={filter} onChange={handlChangeFilter} />
        <Contact contacts={handlFilterContacts()} onClick={handlDeleteContact} />
      </Container>
    );
  }

