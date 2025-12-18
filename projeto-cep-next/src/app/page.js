'use client'; 

import { useState } from 'react';
import AppHeader from '../components/AppHeader';
import SearchForm from '../components/SearchForm';
import ResponsePanel from '../components/ResponsePanel';

export default function Home() {

  const [estadoDaBusca, setEstadoDaBusca] = useState({ 
    error: '', 
    data: null 
  });

  // Função simples apenas para atualizar a tela
  const handleResultado = (resultado) => {
    setEstadoDaBusca({
      error: resultado.error,
      data: resultado.data
    });
  };

  return (
    <div className="AppContainer">
      <AppHeader />
      <SearchForm onResult={handleResultado} />
      <ResponsePanel 
        error={estadoDaBusca.error} 
        address={estadoDaBusca.data} 
      />
    </div>
  );
}