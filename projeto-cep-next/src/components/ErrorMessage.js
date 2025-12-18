export default function ErrorMessage({ message }) {
    if (!message) return null;
  
    return (
      <p style={{ color: 'red', fontWeight: 'bold', marginTop: '10px' }}>
        ✖ {message}
      </p>
    );
  }
