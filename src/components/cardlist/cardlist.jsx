import style from "./cardlist.module.css";
import Card from "../card/card";
import { useValue } from "../../context/card.context";
import Spinner from 'react-spinner-material';
import { ToastContainer } from "react-toastify";



function CardList(){
    const{filteredData,data}=useValue();
    

    if (!data || data.length === 0) {
        return  <div className={style.loading}>
        <Spinner radius={120} color={"#333"} stroke={2} visible={true} />
      </div>;
    }else if(!filteredData||filteredData.length===0){
        return<h1 className={style.loading}>No result found!</h1>
    }

    return(
    <div className={style.cardList}>
        <ToastContainer/>
    {filteredData.map(elem => (
                <Card elem={elem} key={elem.id} />
            ))} 
    </div>
    )
}

export default CardList;