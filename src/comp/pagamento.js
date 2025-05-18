import React, { useState } from "react";
import './pagamento.css';
import { useNavigate } from "react-router-dom";

const Pagamento = () => {
    const navigate = useNavigate();
    const [metodo, setMetodo] = useState("cartao");
    const [form, setForm] = useState({
        nome: '',
        numeroCartao: '',
        validade: '',
        cvv: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert("Pagamento realizado com sucesso!");
        localStorage.removeItem('cart');
        navigate("/");
    };

    return (
        <div className="pagamento-container">
            <h1>Pagamento</h1>

            <div className="metodo-pagamento">
                <button
                    className={metodo === "cartao" ? "ativo" : ""}
                    onClick={() => setMetodo("cartao")}
                >
                    Cartão
                </button>
                <button
                    className={metodo === "pix" ? "ativo" : ""}
                    onClick={() => setMetodo("pix")}
                >
                    Pix
                </button>
            </div>

            {metodo === "cartao" ? (
                <form onSubmit={handleSubmit} className="pagamento-form">
                    <label>
                        Nome no cartão:
                        <input
                            type="text"
                            name="nome"
                            value={form.nome}
                            onChange={handleChange}
                            required
                        />
                    </label>
                    <label>
                        Número do cartão:
                        <input
                            type="text"
                            name="numeroCartao"
                            maxLength="16"
                            value={form.numeroCartao}
                            onChange={handleChange}
                            required
                        />
                    </label>
                    <div className="pagamento-row">
                        <label>
                            Validade:
                            <input
                                type="text"
                                name="validade"
                                placeholder="MM/AA"
                                value={form.validade}
                                onChange={handleChange}
                                required
                            />
                        </label>
                        <label>
                            CVV:
                            <input
                                type="text"
                                name="cvv"
                                maxLength="4"
                                value={form.cvv}
                                onChange={handleChange}
                                required
                            />
                        </label>
                    </div>
                    <button type="submit">Finalizar Compra</button>
                </form>
            ) : (
                <div className="pix-section">
                    <h2>Pagamento via Pix</h2>
                    <img
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/28/QR_code_example.svg/1200px-QR_code_example.svg.png"
                        alt="QR Code Pix"
                        className="qr-code"
                    />
                    <p>Escaneie o QR Code com seu aplicativo bancário.</p>
                    <button onClick={handleSubmit}>Confirmar Pagamento</button>
                </div>
            )}
        </div>
    );
};

export default Pagamento;
