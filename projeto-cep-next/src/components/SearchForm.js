export default function SearchForm({ cep, setCep, onSearch, loading }) {
  return (
    <form className="SearchForm" onSubmit={onSearch}>
      <input
        type="text"
        placeholder="Digite o CEP"        
        value={cep}
        onChange={(e) => setCep(e.target.value)}
        // ...
      />
      <button 
        type="submit"
        disabled={loading}          
      >Buscar</button>
    </form>
  );
}
