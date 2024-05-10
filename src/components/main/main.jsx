import React, { useEffect } from "react";
import style from "./main.module.css"
import Search from "../search/search";
import CardList from "../cardlist/cardlist";
import { useValue } from "../../context/card.context";


function Main(){

    const {setPage}=useValue();
    useEffect(() => {
        setPage(true);
    }, [setPage]);  
    return(
        <div className={style.container}>
            <Search/>
            <CardList/>
        </div>
    )
}

export default Main;