import React from 'react';
import './SobreNos.css';

const SobreNos = () => {
  return (
    <div className="sobre-nos">
      <h1>Sobre Nós</h1>
      <p>
        Bem-vindo à nossa plataforma de food trucks! Nós conectamos amantes da boa comida com os melhores food trucks da cidade.
      </p>
      
      <h2>Nossa Missão</h2>
      <p>
        Facilitar o acesso a refeições de qualidade de forma rápida e prática, apoiando pequenos empreendedores e trazendo conveniência aos clientes.
      </p>

      <h2>O que fazemos</h2>
      <ul>
        <li>📍 Exibimos os food trucks ativos na sua região</li>
        <li>🛒 Permitimos fazer pedidos antecipados diretamente pelo site</li>
        <li>💬 Facilitamos a comunicação entre clientes e vendedores</li>
      </ul>

      <h2>Nosso compromisso</h2>
      <p>
        Valorizamos a experiência do usuário, a qualidade dos alimentos e a inovação na forma de consumir comida de rua.
        Estamos sempre buscando melhorar a jornada do cliente e do vendedor.
      </p>

      <h2>Entre em Contato</h2>
      <p>
        Tem dúvidas, sugestões ou deseja cadastrar seu food truck? Fale conosco pelo e-mail: <strong>contato@foodplataforma.com</strong>
      </p>
    </div>
  );
};

export default SobreNos;
