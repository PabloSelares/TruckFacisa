// src/pages/FoodTruckList.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './FoodTruckList.css';

const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
        stars.push(
            <span key={i} style={{ color: i <= rating ? "#ffc107" : "#e4e5e9" }}>★</span>
        );
    }
    return <div className="stars">{stars}</div>;
};

const FoodTruckList = () => {
    const [foods, setFoods] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get("http://localhost:3000/api/foodtrucks")
            .then((res) => {
                const foodList = res.data.map(food => ({
                    ...food,
                    rating: food.rating ?? Math.floor(Math.random() * 5) + 1
                }));
                setFoods(foodList);
            })
            .catch((err) => console.error("Erro ao buscar food trucks:", err));
    }, []);

    const handleViewItems = (id) => {
        navigate(`/foodtruck/${id}`);
    };

    return (
        <div className="foodtruck-list">
            <h1>Food Trucks Disponíveis</h1>
            <div className="container">
                {foods.length > 0 ? (
                    foods.map(food => (
                        <div key={food._id} className="box">
                            <img src={food.image} alt={food.name} />
                            <h2>{food.name}</h2>
                            <p>{food.description}</p>
                            <p><strong>Horário:</strong> 10:00 - 22:00</p>
                            {renderStars(food.rating)}
                            <button onClick={() => handleViewItems(food._id)}>Ver Itens</button>
                        </div>
                    ))
                ) : (
                    <p>Nenhum food truck encontrado.</p>
                )}
            </div>
        </div>
    );
};

export default FoodTruckList;
