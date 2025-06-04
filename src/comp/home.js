import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import './home.css';
import axios from "axios";

const renderStars = (rating) => {
    const totalStars = 5;
    const stars = [];

    for (let i = 1; i <= totalStars; i++) {
        stars.push(
            <span key={i} style={{ color: i <= rating ? "#ffc107" : "#e4e5e9" }}>★</span>
        );
    }

    return <div className="stars">{stars}</div>;
};

const Product = ({ product, onAddToCart }) => (
    <div className="box">
        <div className="img_box">
            <img src={product.image} alt={product.name} />
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <h3>R$ {product.price}</h3>
            <button onClick={() => onAddToCart(product)}>Adicionar ao carrinho</button>
        </div>
    </div>
);

const FoodTruck = ({ food, onViewItems }) => (
    <div className="box">
        <div className="img_box">
            <img src={food.image} alt={food.name} />
            <h2>{food.name}</h2>
            <p>{food.description}</p>
            <h3>R$ {food.price}</h3>
            <p><strong>Horário:</strong> 10:00 - 22:00</p>
            {renderStars(food.rating)}
            <button onClick={() => onViewItems(food._id)}>Ver itens do Food</button>
        </div>
    </div>
);

const Home = () => {
    const [originalProducts, setOriginalProducts] = useState([]);
    const [trendingProducts, setTrendingProducts] = useState([]);
    const [foods, setFoods] = useState([]);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    const handleViewItems = (id) => {
        navigate(`/foodtruck/${id}`);
    };

    useEffect(() => {
        axios.get("http://localhost:3000/api/produtos")
            .then((response) => {
                setOriginalProducts(response.data);
                setTrendingProducts(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Erro ao carregar produtos:", error);
                setLoading(false);
            });

        axios.get("http://localhost:3000/api/foodtrucks")
            .then((response) => {
                const foodsWithRating = response.data.map(food => ({
                    ...food,
                    rating: food.rating ?? Math.floor(Math.random() * 5) + 1
                }));
                setFoods(foodsWithRating);
            })
            .catch((error) => {
                console.error("Erro ao carregar Food Trucks:", error);
            });
    }, []);

    const filterCategory = useCallback((category) => {
        const filteredProducts = originalProducts.filter(product =>
            product.type.toLowerCase() === category.toLowerCase()
        );
        setTrendingProducts(filteredProducts);
    }, [originalProducts]);

    const resetTrendingProducts = useCallback(() => {
        setTrendingProducts(originalProducts);
    }, [originalProducts]);

    const handleAddToCart = (product) => {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        cart.push(product);
        localStorage.setItem('cart', JSON.stringify(cart));
        navigate('/carrinho');
    };

    if (loading) {
        return <p>Carregando produtos...</p>;
    }

    return (
        <div className="home">
            <div className="intro-container">
                <img src="/image/banner.jpeg" alt="Food Truck" className="banner-img" />
               </div>
            <div className="trending">
                <div className="container">
                    <div className="left_box">
                        <div className="header">
                            <div className="heading">
                                <h1 onClick={resetTrendingProducts}>Lanches em alta</h1>
                            </div>
                            <div className="cate">
                                <h3 onClick={() => filterCategory('new')}>Novo</h3>
                                <h3 onClick={() => filterCategory('mais vendidos')}>Mais vendidos</h3>
                                <h3 onClick={() => filterCategory('mais avaliados')}>Mais avaliados</h3>
                            </div>
                        </div>

                        <div className="products">
                            <div className="container">
                                {trendingProducts.length > 0 ? (
                                    trendingProducts.map(product => (
                                        <Product key={product._id} product={product} onAddToCart={handleAddToCart} />
                                    ))
                                ) : (
                                    <p style={{textAlign: 'center'}}>Nenhum produto encontrado para essa categoria</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="foodTruck">
                <h1 className="title-food">Food's</h1>
                <div className="container">
                    {foods.length > 0 ? (
                        foods.map(food => (
                            <FoodTruck key={food._id} food={food} onViewItems={handleViewItems} />
                        ))
                    ) : (
                        <p>Nenhum food truck disponível</p>
                    )}
                </div>
            </div>
           
        </div>
         
    );
};

export default Home;
