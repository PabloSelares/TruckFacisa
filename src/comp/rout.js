import React from "react";
import { Routes, Route} from "react-router";
import Home from "./home";
import Cart from "./cart";
import Pagamento from "./pagamento";
import FoodTruckDetail from "./foodTruckDetails";
const Rout = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
             <Route path="/carrinho" element={<Cart />} />
         <Route path="/pagamento" element={<Pagamento />} />
             <Route path="/foodtruck/:id" element={<FoodTruckDetail />} />
         </Routes>
    );
    }
    export default Rout;