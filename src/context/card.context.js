import { collection, getDocs } from "firebase/firestore";
import { createContext, useContext, useEffect, useRef, useState } from "react";
import { db } from "../firebase";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const cardContext = createContext();

function useValue(){
    const value=useContext(cardContext);
    return value;
}

function CustomCardContext({children}) {
    const [data, setData] = useState([]);
    const [page, setPage] = useState(true);
    const [price, setPrice] = useState(100000);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredData, setFilteredData] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const rangeRef = useRef(null);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const collectionRef = collection(db, 'Items');
                const querySnapshot = await getDocs(collectionRef);
                const dataArray = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setData(dataArray);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);
    //Notifications
    const notify = (message) => toast(message);
    

    useEffect(() => {
    const filtered = data.filter(elem => {
        const matchesPrice = elem.price < price;
        const matchesSearch = !searchQuery || elem.title.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(elem.category);
        return matchesPrice && matchesSearch && matchesCategory;
    });
        // console.log(filtered);
    setFilteredData(filtered);
    }, [data, price, searchQuery, selectedCategories]);

    //function for search bar
    const handleChange = (event) => {
        setSearchQuery(event.target.value);
    };
    //Function for filtering the data
    const handleCategoryChange = (category) => {
        setSelectedCategories(prevCategories => {
            if (prevCategories.includes(category)) {
                return prevCategories.filter(cat => cat !== category);
            } else {
                return [...prevCategories, category];
            }
        });
    };
    
    return (
        <cardContext.Provider value={{ data, setData,notify, page, setPage, price, setPrice, rangeRef, filteredData 
        ,handleChange,selectedCategories,handleCategoryChange }}>
            {children}
        </cardContext.Provider>
    );
}

export {useValue};
export default CustomCardContext;

