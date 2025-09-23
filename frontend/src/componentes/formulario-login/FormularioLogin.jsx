import { useState } from "react";
import { Link } from "react-router-dom";
import "./FormularioLogin.css";
import logoSena from "../../assets/imagenes/logo_sena.png"; // Importamos el logo

// Definimos el componente funcional FormularioLogin
// Este componente recibe una función como prop: onLoginSuccess
function FormularioLogin({ onLoginSuccess }) {
  // --- ESTADOS DEL COMPONENTE ---
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  // --- MANEJADOR DEL ENVÍO DEL FORMULARIO ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Error en el login");
      }

      localStorage.setItem("token", data.access_token);
      setSuccess("Login exitoso ✅");

      setTimeout(() => {
        onLoginSuccess();
      }, 1500);

    } catch (err) {
      console.error('Error en el login:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // --- RENDERIZADO DEL COMPONENTE ---
  return (
    <div className="login-form-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <img src={logoSena} alt="Logo SENA" className="logo" />
        <h2>Iniciar Sesión</h2>

        {error && <p className="error-message">{error}</p>}
        {success && <p className="success-message">{success}</p>}

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
            placeholder="Tu contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {loading ? (
          <div className="loader"></div>
        ) : (
          <button type="submit" disabled={success}>
            Entrar
          </button>
        )}

        <div className="form-links">
          <p>
            ¿No tienes cuenta? <Link to="/register">Crear cuenta</Link>
          </p>
          <p>
            <Link to="/forgot-password">¿Olvidaste tu contraseña?</Link>
          </p>
        </div>
      </form>
    </div>
  );
}

export default FormularioLogin;
