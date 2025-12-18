'use client'; // Obrigatório para usar Hooks (useState, useEffect) no Next.js App Router

import { useState } from 'react';

export default function Home() {
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
      // Diferença: No Next.js, usamos o fetch nativo do navegador (ou axios se preferir)
      // Aqui a comunicação é CLIENTE -> VIACEP (igual ao seu React puro atual)
      const res = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const data = await res.json();

      if (data.erro) {
        setErro('CEP não encontrado.');
      } else {
        setEndereco({
          logradouro: data.logradouro,
          bairro: data.bairro,
          cidade: data.localidade,
          estado: data.uf,
          codigo_ibge: data.ibge,
          ddd: data.ddd
        });
      }
    } catch (error) {
      setErro('Erro ao buscar o CEP.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif', maxWidth: '500px', margin: '50px auto', textAlign: 'center' }}>
      <h2>Consulta CEP na API do IBGE</h2>
            
      <form onSubmit={handleBuscarCep} style={{ marginBottom: '20px' }}>
        <input
          type="text"
          value={cep}
          onChange={(e) => setCep(e.target.value)}
          placeholder="Digite o CEP"
          maxLength={9}
          style={{ padding: '10px', width: '60%', marginRight: '10px', fontSize: '16px' }}
        />
        <button 
          type="submit" 
          disabled={loading}
          style={{ padding: '10px 20px', cursor: 'pointer', backgroundColor: '#000', color: 'white', border: 'none', fontSize: '16px', borderRadius: '4px' }}
        >
          {loading ? '...' : 'Buscar'}
        </button>
      </form>

      {erro && <p style={{ color: 'red' }}>{erro}</p>}

      {endereco && (
        <div style={{ border: '1px solid #333', padding: '20px', borderRadius: '8px', textAlign: 'left', backgroundColor: '#f0f0f0' }}>
          <h3>Resultado:</h3>
          <p><strong>Rua:</strong> {endereco.logradouro}</p>
          <p><strong>Bairro:</strong> {endereco.bairro}</p>
          <p><strong>Cidade:</strong> {endereco.cidade} - {endereco.estado}</p>
          <p><strong>IBGE:</strong> {endereco.codigo_ibge}</p>
        </div>
      )}
    </div>
  );
}