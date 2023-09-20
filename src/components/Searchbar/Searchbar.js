import { useState } from 'react';
import { SearchBar, SearchBarForm, SearchBarInput } from './Searchbar.styled';

export const Searchbar = ({ onSubmit }) => {
  const [value, setValue] = useState('');

  const handleChange = evt => {
    setValue(evt.target.value.toLowerCase());
  };

  return (
    <SearchBar>
      <SearchBarForm
        onSubmit={evt => {
          evt.preventDefault();
          onSubmit(value);
        }}
      >
        <SearchBarInput
          className="input"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          name="query"
          value={value}
          onChange={handleChange}
        />
        <button type="submit" className="button">
          <span className="button-label">Search</span>
        </button>
      </SearchBarForm>
    </SearchBar>
  );
};

export default Searchbar;
