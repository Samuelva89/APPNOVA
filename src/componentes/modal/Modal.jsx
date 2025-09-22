import React from 'react';
import './Modal.css';

// Componente genérico para mostrar una ventana modal.
// Es reutilizable para cualquier contenido que queramos mostrar.
function Modal({ isOpen, onClose, children }) {
  console.log('Renderizando Modal. isOpen:', isOpen);
  // Si el modal no está abierto (isOpen es false), no renderizamos nada.
  if (!isOpen) {
    return null;
  }

  // Si está abierto, renderizamos el modal.
  return (
    // El "overlay" es el fondo oscuro que cubre toda la pantalla.
    // Si el usuario hace clic en el fondo (overlay), se llama a la función `onClose`.
    <div className="modal-overlay" onClick={onClose}>
      {/* El contenido del modal. */}
      {/* Hacemos `e.stopPropagation()` para que si el usuario hace clic DENTRO del contenido,
          no se propague el evento hacia el overlay y se cierre el modal. */}
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {/* Botón para cerrar el modal. Llama a `onClose` al hacer clic. */}
        <button className="modal-close" onClick={onClose}>
          &times; {/* Este es el símbolo de una 'x' para cerrar */}
        </button>
        {/* Aquí se renderiza el contenido que le pasemos al modal. */}
        {/* En nuestro caso, será el formulario de registro. */}
        {children}
      </div>
    </div>
  );
}

export default Modal;
