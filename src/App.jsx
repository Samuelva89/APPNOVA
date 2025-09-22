import { useState } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';

// Importamos los componentes que hemos creado
import FormularioLogin from './componentes/formulario-login/FormularioLogin';
import FormularioRegistro from './componentes/formulario-registro/FormularioRegistro';
import FormularioOlvido from './componentes/formulario-olvido/FormularioOlvido';
import FormularioReset from './componentes/formulario-reset/FormularioReset';

// El componente principal de nuestra aplicación
function App() {
  // --- ESTADOS DEL COMPONENTE ---
  const [token, setToken] = useState(localStorage.getItem('token'));
  const navigate = useNavigate();

  // --- FUNCIONES MANEJADORAS ---

  const handleLoginSuccess = () => {
    const storedToken = localStorage.getItem('token');
    setToken(storedToken);
    navigate('/'); // Navega a la página principal después del login
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
    // No es necesario navegar aquí, el componente se re-renderizará y redirigirá
  };

  const handleRegisterSuccess = () => {
    // Después de un registro exitoso, llevamos al usuario a la página de login
    navigate('/login');
  };


  // --- RENDERIZADO DEL COMPONENTE ---
  return (
    <Routes>
      {/* Ruta principal (Dashboard o página de bienvenida) */}
      <Route 
        path="/" 
        element={
          token ? (
            <div style={{ textAlign: 'center', marginTop: '50px' }}>
              <h2>¡Bienvenido!</h2>
              <p>Tu sesión está iniciada.</p>
              <button onClick={handleLogout} style={{ padding: '10px 20px', cursor: 'pointer' }}>
                Cerrar Sesión
              </button>
            </div>
          ) : (
            <Navigate to="/login" />
          )
        }
      />

      {/* Ruta para el Login */}
      <Route 
        path="/login"
        element={
          !token ? (
            <FormularioLogin onLoginSuccess={handleLoginSuccess} />
          ) : (
            <Navigate to="/" />
          )
        }
      />

      {/* Ruta para el Registro */}
      <Route 
        path="/register"
        element={
          !token ? (
            <FormularioRegistro onRegisterSuccess={handleRegisterSuccess} />
          ) : (
            <Navigate to="/" />
          )
        }
      />

      {/* Ruta para Olvido de Contraseña */}
      <Route 
        path="/forgot-password"
        element={
          !token ? (
            <FormularioOlvido />
          ) : (
            <Navigate to="/" />
          )
        }
      />

      {/* Ruta para Restablecer Contraseña */}
      <Route 
        path="/reset-password"
        element={
          !token ? (
            <FormularioReset />
          ) : (
            <Navigate to="/" />
          )
        }
      />

    </Routes>
  );
}

export default App;
