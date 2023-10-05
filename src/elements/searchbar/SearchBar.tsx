/** @format */

import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { BsSearch } from "react-icons/bs";

import style from "./style.module.css";

import {suggestionsInterface} from "../../model"



export default function SearchBar({className}: {className?: string}) {
  const navigate = useNavigate();
  const [searchSuggestions, setSearchSuggestions] = useState<suggestionsInterface[]>();
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>();
  const [searchType, setSearchType] = useState<string>();

  useEffect(() => {
    setSearchType('book');
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if(!searchTerm) return;

    navigate(`/Store/Search/${searchType}?query=${searchTerm}`);
  };

  const handleSearchChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
    if(!e.target.value) return setSearchSuggestions([]);
    const result = (
      await axios(
        `${import.meta.env.VITE_SERVER_LINK}/ss/${searchType}?query=${e.target.value}`
      )
    ).data;
    setSearchSuggestions(result);
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSearchType(e.target.value);
    setSearchSuggestions([]);
  };

  return (
    <form className={`${style.searchBarContainer} ${className ? className : ""}`} onSubmit={handleSubmit}>
      <select onChange={handleSelectChange} className={style.searchType}>
        <option value="book">Book</option>
        <option value="author">Author</option>
      </select>
      <div
        className={style.searchInput}
      >
        <BsSearch />
        <input
          onChange={handleSearchChange}
          type="text"
          placeholder="What Do You Wanna Look For Today ?"
          onBlur={() => setTimeout(() => setShowSuggestions(false), 500)}  //
          onFocus={() => setShowSuggestions(true)}
        />
        {searchSuggestions?.length != 0 && showSuggestions && (
          <ul className={style.searchSuggestions}>
            {searchSuggestions?.slice(0, 8).map((s) => (
              <li key={s._id}>
                <Link to={`Profile/${searchType}?id=${s.id}`}>
                  {s.name}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
      <button type="submit" className={`${style.submitButton} button`}>
        Search
      </button>
    </form >
  );
}
