import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import './cart.css';

const Cart = () => {
    const [cart, setCart] = useState([]);
    const [removingIndex, setRemovingIndex] = useState(null); // para animação
    const navigate = useNavigate();

    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
        setCart(storedCart);
    }, []);

    const handleRemove = (indexToRemove) => {
        const confirmRemove = window.confirm("Tem certeza que deseja remover este item?");
        if (!confirmRemove) return;

        setRemovingIndex(indexToRemove);

        // espera a animação de saída (300ms)
        setTimeout(() => {
            const updatedCart = cart.filter((_, index) => index !== indexToRemove);
            setCart(updatedCart);
            localStorage.setItem('cart', JSON.stringify(updatedCart));
            setRemovingIndex(null);
        }, 300);
    };

    const total = cart.reduce((acc, item) => acc + parseFloat(item.price), 0);

    if (cart.length === 0) return <p className="empty-cart">Seu carrinho está vazio.</p>;

    return (
        <div className="cart-container">
            <h1>Seu Carrinho</h1>
            <ul className="cart-list">
                {cart.map((item, index) => (
                    <li
                        key={index}
                        className={`cart-item ${removingIndex === index ? 'fade-out' : ''}`}
                    >
                        <img src={item.image} alt={item.name} className="cart-item-image" />
                        <div className="cart-item-info">
                            <h2>{item.name}</h2>
                            <p>Preço: <span className="price-highlight">R$ {item.price}</span></p>
                            <button className="btn-remove" onClick={() => handleRemove(index)}>Remover</button>
                        </div>
                    </li>
                ))}
            </ul>
            <div className="cart-total">
                <strong>Total: </strong> <span className="price-highlight">R$ {total.toFixed(2)}</span>
            </div>
            <button className="btn-pay" onClick={() => navigate('/pagamento')}>Pagar</button>
        </div>
    );
};

export default Cart;
