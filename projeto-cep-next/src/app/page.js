'use client'; 

import { useCep } from '../hooks/useCep'; // <--- Hook importado AQUI
import AppHeader from '../components/AppHeader';
import SearchForm from '../components/SearchForm';
import ResponsePanel from '../components/ResponsePanel';

export default function Home() {

  // O Pai usa o Hook e distribui os dados e funções
  const { cep, setCep, endereco, erro, loading, buscarCep } = useCep();

  return (
    <div className="AppContainer">
      <AppHeader />
      <SearchForm 
        cep={cep} 
        setCep={setCep} 
        onSearch={buscarCep} // Passamos a função de busca
        loading={loading}
      />
      {/* O Pai já tem o endereço do Hook, então ele passa para o painel */}
      <ResponsePanel 
        address={endereco} 
        error={erro} 
      />
    </div>
  );
}