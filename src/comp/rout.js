import React from "react";
import { Routes, Route} from "react-router";
import Home from "./home";
import Cart from "./cart";
import Pagamento from "./pagamento";
import FoodTruckDetail from "./foodTruckDetails";
import FoodTruckList from './foodTruckList'
import SobreNos from './sobreNos';
const Rout = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
             <Route path="/carrinho" element={<Cart />} />
         <Route path="/pagamento" element={<Pagamento />} />
             <Route path="/foodtruck/:id" element={<FoodTruckDetail />} />
             <Route path="/foodtrucks" element={<FoodTruckList />} />
             <Route path="/sobre" element={<SobreNos />} />
         </Routes>
    );
    }
    export default Rout;