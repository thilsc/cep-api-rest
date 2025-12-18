export default function AddressResult({ data }) {
    if (!data) return null;
  
    return (
      <div className="AddressResult">
        <h3>📍 Endereço Encontrado:</h3>
        <ul>
          <li><strong>Rua:</strong> {data.logradouro}</li>
          <li><strong>Bairro:</strong> {data.bairro}</li>
          <li><strong>Cidade:</strong> {data.cidade} - {data.estado}</li>
          <li><strong>IBGE:</strong> {data.codigo_ibge}</li>
          <li><strong>DDD:</strong> {data.ddd}</li>
        </ul>
      </div>
    );
  }
