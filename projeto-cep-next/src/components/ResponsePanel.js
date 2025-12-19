  import ErrorMessage from './ErrorMessage';
  import AddressResult from './AddressResult';
  
  export default function ResponsePanel({ error, address }) {
    // Se não tem erro nem endereço, não mostra o painel (retorna null)
    if (!error && !address) return null;
  
    return (
      <div className="ResponsePanel">
        {/* O Painel decide qual filho renderizar */}
        {error ? (
          <ErrorMessage message={error} />
        ) : (
          <AddressResult data={address} />
        )}
      </div>
    );
  }
  