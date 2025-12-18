import { useState } from 'react';

// Agora ele recebe "onSucesso" e "onErro" em vez de "cep" e "setCep"
export default function SearchForm({ onResult }) {
  const [cepLocal, setCepLocal] = useState('');
  const [loading, setLoading] = useState(false);

  // A função está AQUI DENTRO agora, inacessível para o resto do app
  const handleBuscarCepInterno = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Limpa estado anterior no pai
    onResult({ loading: true, error: null, data: null });

    try {
      const res = await fetch(`https://viacep.com.br/ws/${cepLocal}/json/`);
      const data = await res.json();

      if (data.erro) {
        onResult({ loading: false, error: 'CEP não existe', data: null });
      } else {
        onResult({ 
          loading: false, 
          error: null, 
          data: {
            logradouro: data.logradouro,
            bairro: data.bairro,
            cidade: data.localidade,
            estado: data.uf,
            codigo_ibge: data.ibge,
            ddd: data.ddd
          } 
        });
      }
    } catch (err) {
      onResult({ loading: false, error: 'Erro de conexão', data: null });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="SearchForm" onSubmit={handleBuscarCepInterno}>
      <input
        type="text"
        value={cepLocal}
        onChange={(e) => setCepLocal(e.target.value)}
        placeholder="Digite o CEP"
      />
      <button 
        type="submit" 
        disabled={loading}
      >
        {loading ? '...' : 'Buscar'}
      </button>
    </form>
  );
}