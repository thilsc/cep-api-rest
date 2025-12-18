import { useState } from 'react';

export function useCep() {
  const [cep, setCep] = useState('');
  const [endereco, setEndereco] = useState(null);
  const [erro, setErro] = useState('');
  const [loading, setLoading] = useState(false);

  const buscarCep = async (e) => {
    if (e) e.preventDefault(); // Previne o reload do form
    
    setErro('');
    setEndereco(null);
    setLoading(true);

    try {
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
      setErro('Erro ao buscar.');
    } finally {
      setLoading(false);
    }
  };

  return { 
    cep, 
    setCep, 
    endereco, 
    erro, 
    loading, 
    buscarCep 
  };
}