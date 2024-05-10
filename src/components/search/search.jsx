import React from "react";
import style from "./search.module.css";
import { useValue } from "../../context/card.context";

function Search(){
    const {handleChange}=useValue();
    return(
    <div className={style.search}>
        <input type="search" className={style.innerSearch} placeholder="Search By Name" onChange={handleChange}/>
    </div>
    )
}
export default Search;