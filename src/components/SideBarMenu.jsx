import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Sidebar } from "primereact/sidebar";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../JS/Actions/ProductActions";


const SideBarMenu = () => {
  const [visible, setVisible] = useState(false);
  const [Genders, setGenders] = useState([]);
  const [Categorys, setCategorys] = useState([]);
  const [activeButton, setActiveButton] = useState("Men");
  const [activeCategory, setActiveCategory] = useState("T-shirt")
  const dispatch = useDispatch();
  const Products = useSelector((state) => state.ProductReducer.products);

 // Récupérer les produits lorsque le composant est monté
 useEffect(() => {
  dispatch(getProducts());
}, [dispatch]);
  

useEffect(() => {
  if (Products.length > 0) {
   // Extraire les catégories uniques
    setCategorys(
      Products.reduce((acc, obj) => {
        if (!acc.includes(obj.category)) {
          acc.push(obj.category);
        }
        return acc;
      }, [])
    );

    // Extraire les genres uniques
    setGenders(
      Products.reduce((acc, obj) => {
        if (!acc.includes(obj.gender)) {
          acc.push(obj.gender);
        }
        return acc;
      }, [])
    );
  }
}, [Products]); // Dépend de Products

  // Fonction pour gérer le clic sur les boutons
  const handleClick = (button) => {
    setActiveButton(button); // Définit le bouton gender actif
  }
  const handleCategoryClick = (cat) =>{ 
    setActiveCategory(cat); // Définit la catégorie actuelle
  }

   
  return (
    <div>
      <div className="flex-col lg:flex mt-0 lg:flex-row w-full max-h-full  gap-2 lg:justify-start lg:items-center  ">
        <div className="">
          <button
            className="px-2 py-1  ml-0   flex gap-1   text-white font-semibold  rounded-full duration-150 border-2
         border-black hover:border-white hover:text-white   "
            onClick={() => setVisible(true)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#000000"
              color="white"
            >
              <path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z" />
            </svg>
            Menu
          </button>
        </div>
      </div>
      <div className=" relative card flex  ">
        <Sidebar
          visible={visible}
          onHide={() => setVisible(false)}
          className="absolute w-5/6 h-[524px] xl:h-full mt-32 xl:w-1/6
         md:w-20rem lg:w-30rem bg-white/40  flex justify-start
         "
        >
          <div>
            <h1 className="font-semibold text-white text-xl ml-2 ">Menu </h1>
          </div>

          <div className="flex justify-start gap-0">
          

            {/* Bouton 1 */}
            <button
              className={`btn ${activeButton === Genders[0] ? "active" : ""}`}
              onClick={() => handleClick(Genders[0])}
              value={Genders[0]}
            >
              {Genders[0]}
            </button>

            {/* Bouton 2 */}
            <button
              className={`btn ${activeButton === Genders[1] ? "active" : ""}`}
              onClick={() => handleClick(Genders[1])}
              value={Genders[1]}
            >
              {Genders[1]}
            </button>
         
          </div>
          <>   <hr className="text-slate-950  ml-2 mr-2 mt-3 "/>   </>  
         {/* ////display all category */}

         <div className=" flex flex-wrap justify-start gap-3 ml-0 xl:ml-1 mt-10">
         {
         Categorys.map((category,i) =>(
          // Utilisation correcte des paramètres dynamiques
          <Link key={i}  to={`/CategoryShop/${activeButton}/${category}`} >
          <button className={`btn ${activeCategory === Categorys[i] ? "active" : ""}`}
              onClick={() =>{ handleCategoryClick(Categorys[i])
                setVisible(false) } 
                
              }
          > {category} </button>
          </Link>
          

         ))
         
        
        }

         </div>

        </Sidebar>
      </div>
    </div>
  );
};

export default SideBarMenu;
