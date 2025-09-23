import { useState } from 'react';
import { Link } from 'react-router-dom';
import './FormularioOlvido.css';

function FormularioOlvido() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    // --- SIMULACIÓN DE LLAMADA A LA API ---
    // En una aplicación real, aquí harías una petición a tu backend
    // await fetch('http://localhost:3000/auth/forgot-password', { ... });
    console.log(`Solicitando recuperación para el email: ${email}`);

    // Simulamos una espera de red
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Por seguridad, siempre mostramos un mensaje de éxito genérico,
    // para no revelar si un email está o no en la base de datos.
    setSuccess('Si existe una cuenta con ese correo, recibirás un enlace para restablecer tu contraseña.');
    setLoading(false);
  };

  return (
    <div className="forgot-password-form-container">
      <form className="forgot-password-form" onSubmit={handleSubmit}>
        <h2>Recuperar Contraseña</h2>
        <p className="instructions">
          Ingresa tu correo electrónico y te enviaremos un enlace para restablecer tu contraseña.
        </p>

        {error && <p className="error-message">{error}</p>}
        {success && <p className="success-message">{success}</p>}

        {!success && (
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
        )}

        {loading ? (
          <div className="loader"></div>
        ) : (
          !success && (
            <button type="submit">
              Enviar Enlace de Recuperación
            </button>
          )
        )}

        <div className="form-links">
          <p>
            <Link to="/login">Volver a Iniciar Sesión</Link>
          </p>
        </div>
      </form>
    </div>
  );
}

export default FormularioOlvido;
