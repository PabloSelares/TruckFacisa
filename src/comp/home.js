import React, { useState, useEffect, useCallback } from "react";
import './home.css';
import axios from "axios";

// Componente para exibir cada produto
const Product = ({ product }) => (
    <div className="box">
        <div className="img_box">
            <img src={product.image} alt={product.name} />
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <h3>R$ {product.price}</h3>
            <button>Adicionar ao carrinho</button>
        </div>
    </div>
);

// Componente para exibir os Food Trucks
const FoodTruck = ({ food }) => (
    <div className="box">
        <div className="img_box">
            <img src={food.image} alt={food.name} />
            <h2>{food.name}</h2>
            <p>{food.description}</p>
            <h3>R$ {food.price}</h3>
            <button>Ver itens do Food</button>
        </div>
    </div>
);

const Home = () => {
    const [originalProducts, setOriginalProducts] = useState([]);
    const [trendingProducts, setTrendingProducts] = useState([]);
    const [foods, setFoods] = useState([]);
    const [loading, setLoading] = useState(true);

    // Carregar dados do backend
    useEffect(() => {
        axios.get("http://localhost:3000/api/produtos")
            .then((response) => {
                console.log("Produtos carregados:", response.data);
                setOriginalProducts(response.data);      // mantém os dados originais
                setTrendingProducts(response.data);      // exibe todos inicialmente
                setLoading(false);
            })
            .catch((error) => {
                console.error("Erro ao carregar produtos:", error);
                setLoading(false);
            });

        axios.get("http://localhost:3000/api/foodtrucks")
            .then((response) => {
                setFoods(response.data);
            })
            .catch((error) => {
                console.error("Erro ao carregar Food Trucks:", error);
            });
    }, []);

    const filterCategory = useCallback((category) => {
        console.log(`Filtrando por: ${category}`);
        const filteredProducts = originalProducts.filter(product =>
            product.type.toLowerCase() === category.toLowerCase()
        );

        if (filteredProducts.length === 0) {
            console.log("Nenhum produto encontrado para essa categoria");
        }

        setTrendingProducts(filteredProducts);
    }, [originalProducts]);

    const resetTrendingProducts = useCallback(() => {
        setTrendingProducts(originalProducts);
    }, [originalProducts]);

    if (loading) {
        return <p>Carregando produtos...</p>;
    }

    return (
        <div className="home">
            <div className="top_banner"></div>

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
                                        <Product key={product._id} product={product} />
                                    ))
                                ) : (
                                    <p>Nenhum produto encontrado para essa categoria</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="foodTruck">
                <h1>Food Trucks disponíveis</h1>
                <div className="container">
                    {foods.length > 0 ? (
                        foods.map(food => (
                            <FoodTruck key={food._id} food={food} />
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
