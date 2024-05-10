import React from 'react';
import style from './filter.module.css';
import { useValue } from '../../context/card.context';

function Filter() {
    const { price, setPrice, rangeRef,handleCategoryChange, selectedCategories} = useValue();
    
    return (
        <div className={style.container}>
            <div className={style.range}>
                <h5>Filter</h5>
                <h6>{`Price:${price} `}</h6>
                <input type="range" value={price} min="1" max="99999" ref={rangeRef} onChange={() => { setPrice(parseInt(rangeRef.current.value)); }} />
            </div>
            <div className="form-check">
                <input className="form-check-input" type="checkbox" checked={selectedCategories.includes('Electronics')} onChange={() => handleCategoryChange('Electronics')} />
                <label className="form-check-label">
                    Electronics
                </label>
            </div>
            <div className="form-check">
                <input className="form-check-input" type="checkbox" checked={selectedCategories.includes('Grocery')} onChange={() => handleCategoryChange('Grocery')} />
                <label className="form-check-label">
                    Grocery
                </label>
            </div>
            <div className="form-check">
                <input className="form-check-input" type="checkbox" checked={selectedCategories.includes('Skin Care')} onChange={() => handleCategoryChange('Skin Care')} />
                <label className="form-check-label">
                    Skin Care
                </label>
            </div>
            <div className="form-check">
                <input className="form-check-input" type="checkbox" checked={selectedCategories.includes('Decoration')} onChange={() => handleCategoryChange('Decoration')} />
                <label className="form-check-label">
                    Decoration
                </label>
            </div>
        </div>
    )
}

export default Filter;


// import React from 'react';
// import style from './filter.module.css';
// import { useValue } from '../../context/card.context';

// function Filter(){
//     const {price,setPrice,rangeRef,setSelectedCategories}=useValue();

//     return(
//         <div className={style.container}>
//             <div className={style.range}>
//                 <h5>Filter</h5>
//                 <h6>{`Price:${price} `}</h6>
//                 <input type="range" value={price} min="1" max="99999" ref={rangeRef} onChange={()=>{setPrice(parseInt(rangeRef.current.value));}}/>
//             </div>
//             <div className="form-check">
//                 <input className="form-check-input" type="checkbox" value=""/>
//                 <label className="form-check-label">
//                     Electronics
//                 </label>
//             </div>
//             <div className="form-check">
//                 <input className="form-check-input" type="checkbox" value=""/>
//                 <label className="form-check-label">
//                    Grocery
//                 </label>
//             </div>
//             <div className="form-check">
//                 <input className="form-check-input" type="checkbox" value="" />
//                 <label className="form-check-label" >
//                     Skin Care
//                 </label>
//             </div>
//             <div className="form-check">
//                 <input className="form-check-input" type="checkbox" value=""/>
//                 <label className="form-check-label" >
//                     Mobile
//                 </label>
//             </div>
//         </div>
//     )
// }

// export default Filter;