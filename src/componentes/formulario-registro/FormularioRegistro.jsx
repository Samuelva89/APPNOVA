import { useState } from 'react';
import { Link } from 'react-router-dom';
import './FormularioRegistro.css';

// Definimos el componente funcional FormularioRegistro
// Recibe una función `onRegisterSuccess` como prop, que se llamará cuando el registro sea exitoso
function FormularioRegistro({ onRegisterSuccess }) {
  // --- ESTADOS DEL COMPONENTE ---
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  // --- MANEJADOR DEL ENVÍO DEL FORMULARIO ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      const res = await fetch('http://localhost:3000/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Error en el registro');
      }

      setSuccess('Registro exitoso ✅. Serás redirigido al login.');

      setTimeout(() => {
        onRegisterSuccess();
      }, 2000);

    } catch (err) {
      console.error('Error en el registro:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // --- RENDERIZADO DEL COMPONENTE ---
  return (
    <div className="register-form-container">
      <form className="register-form" onSubmit={handleSubmit}>
        <h2>Crear Cuenta</h2>

        {error && <p className="error-message">{error}</p>}
        {success && <p className="success-message">{success}</p>}

        <div className="input-group">
          <label htmlFor="name">Nombre</label>
          <input
            id="name"
            type="text"
            placeholder="Tu nombre"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="input-group">
          <label htmlFor="email">Correo electrónico</label>
          <input
            id="email"
            type="email"
            placeholder="tu@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="input-group">
          <label htmlFor="password">Contraseña</label>
          <input
            id="password"
            type="password"
            placeholder="Crea una contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {loading ? (
          <div className="loader"></div>
        ) : (
          <button type="submit" disabled={!!success}>
            Registrarse
          </button>
        )}

        <div className="form-links">
          <p>
            ¿Ya tienes cuenta? <Link to="/login">Volver a Iniciar Sesión</Link>
          </p>
        </div>
      </form>
    </div>
  );
}

export default FormularioRegistro;
