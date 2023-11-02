import { useParams, useLocation, useNavigate } from "react-router-dom";

import SearchBar from "../../../elements/searchbar/SearchBar"

import Author from "./Author";
import Book from "./Book";

import style from "./style.module.css"

export default function Profile() {
  const navigator = useNavigate();
  const location = useLocation();

  const { type } = useParams<{ type: string }>();
  const id = new URLSearchParams(location.search).get('id');

  if (!type)
    navigator('/Store');

  return (
    <div className={style.profile}>
      <SearchBar />
      {type === 'book' ? <Book bookID={id!} /> : <Author authorID={id!} />}
    </div>
  )
}
