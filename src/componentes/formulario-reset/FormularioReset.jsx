import { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import './FormularioReset.css';

function FormularioReset() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden.');
      return;
    }

    if (!token) {
      setError('Token de restablecimiento no válido o faltante.');
      return;
    }

    setLoading(true);

    // --- SIMULACIÓN DE LLAMADA A LA API ---
    console.log(`Restableciendo contraseña con token: ${token}`);
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Aquí harías la petición a tu backend:
    // const res = await fetch('http://localhost:3000/auth/reset-password', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ token, password }),
    // });

    // Simulación de éxito
    setSuccess('¡Tu contraseña ha sido restablecida con éxito!');
    setLoading(false);
  };

  if (!token) {
    return (
      <div className="reset-password-form-container">
        <div className="reset-password-form">
            <h2>Token Inválido</h2>
            <p className="error-message">El enlace de restablecimiento de contraseña no es válido o ha expirado.</p>
            <div className="form-links">
              <p>
                <Link to="/login">Volver a Iniciar Sesión</Link>
              </p>
            </div>
        </div>
      </div>
    );
  }

  return (
    <div className="reset-password-form-container">
      <form className="reset-password-form" onSubmit={handleSubmit}>
        <h2>Restablecer Contraseña</h2>

        {error && <p className="error-message">{error}</p>}
        {success && <p className="success-message">{success}</p>}

        {!success && (
          <>
            <div className="input-group">
              <label htmlFor="password">Nueva Contraseña</label>
              <input
                id="password"
                type="password"
                placeholder="Introduce tu nueva contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="input-group">
              <label htmlFor="confirmPassword">Confirmar Nueva Contraseña</label>
              <input
                id="confirmPassword"
                type="password"
                placeholder="Confirma tu nueva contraseña"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
          </>
        )}

        {loading ? (
          <div className="loader"></div>
        ) : (
          !success && (
            <button type="submit">
              Restablecer Contraseña
            </button>
          )
        )}

        <div className="form-links">
          {success && (
            <p>
              <Link to="/login">Ir a Iniciar Sesión</Link>
            </p>
          )}
        </div>
      </form>
    </div>
  );
}

export default FormularioReset;
