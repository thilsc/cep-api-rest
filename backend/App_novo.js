import React, { useState } from 'react';
import axios from 'axios';
import './App.css'; // Estilização opcional

function App() {
  const API_URL = 'http://localhost:3001/api/consulta-cep/';

  const [cep, setCep] = useState('');
  const [endereco, setEndereco] = useState(null);
  const [erro, setErro] = useState('');
  const [loading, setLoading] = useState(false);

  const handleBuscarCep = async (e) => {
    e.preventDefault();
    setErro('');
    setEndereco(null);
    setLoading(true);

    try {
      // Chama a nossa API Backend local
      const response = await axios.get(`${API_URL}${cep}`);
      setEndereco(response.data);
    } catch (error) {
      if (error.response && error.response.data.error) {
        setErro(error.response.data.error);
      } else {
        setErro("Ocorreu um erro ao buscar o CEP.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif', maxWidth: '500px', margin: '0 auto' }}>
      <h2>Consulta Endereço e IBGE</h2>
      
      <form onSubmit={handleBuscarCep} style={{ marginBottom: '20px' }}>
        <input
          type="text"
          value={cep}
          onChange={(e) => setCep(e.target.value)}
          placeholder="Digite o CEP (ex: 01001000)"
          maxLength={9}
          style={{ padding: '10px', width: '70%', marginRight: '10px' }}
        />
        <button 
          type="submit" 
          disabled={loading}
          style={{ padding: '10px 20px', cursor: 'pointer', backgroundColor: '#007BFF', color: 'white', border: 'none' }}
        >
          {loading ? 'Buscando...' : 'Consultar'}
        </button>
      </form>

      {erro && <p style={{ color: 'red' }}>{erro}</p>}

      {endereco && (
        <div style={{ border: '1px solid #ccc', padding: '15px', borderRadius: '5px', backgroundColor: '#f9f9f9' }}>
          <h3>Dados Encontrados:</h3>
          <p><strong>Logradouro:</strong> {endereco.logradouro}</p>
          <p><strong>Bairro:</strong> {endereco.bairro}</p>
          <p><strong>Cidade/UF:</strong> {endereco.cidade} / {endereco.estado}</p>
          <p><strong>Código IBGE:</strong> {endereco.codigo_ibge}</p>
          <p><strong>DDD:</strong> {endereco.ddd}</p>
        </div>
      )}
    </div>
  );
}

export default App;
