import React from "react";
import { GiFoodTruck } from "react-icons/gi";
import { IoIosSearch } from "react-icons/io";
import { useAuth0 } from "@auth0/auth0-react";
import { CiLogout, CiUser, CiLogin } from "react-icons/ci";
import { Link } from "react-router-dom";

import './nav.css';

const Nav = () => {
  const { loginWithRedirect, logout, user, isAuthenticated } = useAuth0();

  return (
    <div className="header">
     
      <div className="top_header">
        <div className="icon">
          <GiFoodTruck />
        </div>
        <div className="info">
          <p>
            Ganhe <strong>10% OFF</strong> na sua primeira compra! Aproveite 🚚✨
          </p>
        </div>
      </div>

      <div className="mid_header">
        <div className="logo">
          <img src="/image/logo.png" alt="logo" />
        </div>

        <div className="search">
          <input type="text" placeholder="Buscar produto" />
          <button>
            <IoIosSearch />
          </button>
        </div>

        {isAuthenticated ? (
          <div className="user">
       
            
            <div className="btn">
              <button
                onClick={() =>
                  logout({ logoutParams: { returnTo: window.location.origin } })
                }
              >
                Sair
              </button>
            </div>
          </div>
        ) : (
          <div className="user">
            <div className="btn">
              <button onClick={() => loginWithRedirect()}>Entrar</button>
            </div>
          </div>
        )}

        {isAuthenticated && user && (
          <div className="user_name_top_right">
            <img src={user.picture} alt="User" className="user_avatar" />
            <span>Olá, {user.name}!</span>
          </div>
        )}
      </div>

      <div className="last_header">
        <div className="user_profile">
          <div className="icon">
          
          </div>

          <div className="nav">
            <ul>
              <li>
                <Link to="/" className="link">Home</Link>
              </li>
              <li>
                <Link to="/carrinho" className="link">Carrinho</Link>
              </li>
               <li><Link to="/foodtrucks" className="link">Food Trucks</Link></li>
              <li>
              <li><Link to="/sobre" className="link">Sobre Nós</Link></li>

              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Nav;
