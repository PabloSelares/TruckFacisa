import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import './FoodTruckDetail.css';

const FoodTruckDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [foodTruck, setFoodTruck] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchFoodTruck = async () => {
            try {
                const [foodTruckRes, productsRes] = await Promise.all([
                    axios.get(`http://localhost:3000/api/foodtrucks/${id}`),
                    axios.get(`http://localhost:3000/api/produtos?foodTruckId=${id}`)
                ]);
                setFoodTruck(foodTruckRes.data);
                setProducts(productsRes.data);
                setLoading(false);
            } catch (error) {
                console.error("Erro ao buscar dados:", error);
                setLoading(false);
            }
        };

        fetchFoodTruck();
    }, [id]);

    const handleAddToCart = (product) => {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        cart.push(product);
        localStorage.setItem('cart', JSON.stringify(cart));
        navigate('/carrinho');
    };

    if (loading) return <p>Carregando...</p>;

    return (
        <div className="foodtruck-detail">
            <h1>{foodTruck?.name}</h1>
            <p>{foodTruck?.description}</p>

            <h2>Itens disponíveis:</h2>
            <div className="products">
                {products.length > 0 ? (
                    products.map(product => (
                        <div key={product._id} className="box">
                            <img src={product.image} alt={product.name} />
                            <h3>{product.name}</h3>
                            <p>{product.description}</p>
                            <p><strong>R$ {product.price}</strong></p>
                            <button onClick={() => handleAddToCart(product)}>Adicionar ao carrinho</button>
                        </div>
                    ))
                ) : (
                    <p>Esse food truck ainda não possui itens cadastrados.</p>
                )}
            </div>
        </div>
    );
};

export default FoodTruckDetail;
