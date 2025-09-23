import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import FormularioRegistro from './FormularioRegistro';

// Mock fetch globally
beforeEach(() => {
    global.fetch = jest.fn();
    jest.useFakeTimers();
});

afterEach(() => {
    jest.resetAllMocks();
    jest.useRealTimers();
});

test('renders form fields and submit button', () => {
    render(<FormularioRegistro onRegisterSuccess={jest.fn()} />);
    expect(screen.getByLabelText(/Nombre/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Correo electrónico/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Contraseña/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Registrarse/i })).toBeInTheDocument();
});

test('shows error message on failed registration', async () => {
    global.fetch.mockResolvedValueOnce({
        ok: false,
        json: async () => ({ message: 'Email ya registrado' }),
    });

    render(<FormularioRegistro onRegisterSuccess={jest.fn()} />);
    fireEvent.change(screen.getByLabelText(/Nombre/i), { target: { value: 'Juan' } });
    fireEvent.change(screen.getByLabelText(/Correo electrónico/i), { target: { value: 'juan@email.com' } });
    fireEvent.change(screen.getByLabelText(/Contraseña/i), { target: { value: '123456' } });
    fireEvent.click(screen.getByRole('button', { name: /Registrarse/i }));

    await waitFor(() => {
        expect(screen.getByText(/Email ya registrado/i)).toBeInTheDocument();
    });
});

test('shows success message and calls onRegisterSuccess after registration', async () => {
    const mockOnSuccess = jest.fn();
    global.fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ user: { name: 'Juan' } }),
    });

    render(<FormularioRegistro onRegisterSuccess={mockOnSuccess} />);
    fireEvent.change(screen.getByLabelText(/Nombre/i), { target: { value: 'Juan' } });
    fireEvent.change(screen.getByLabelText(/Correo electrónico/i), { target: { value: 'juan@email.com' } });
    fireEvent.change(screen.getByLabelText(/Contraseña/i), { target: { value: '123456' } });
    fireEvent.click(screen.getByRole('button', { name: /Registrarse/i }));

    await waitFor(() => {
        expect(screen.getByText(/Registro exitoso/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /Registrarse/i })).toBeDisabled();
    });

    // Fast-forward 2 seconds for setTimeout
    jest.advanceTimersByTime(2000);

    await waitFor(() => {
        expect(mockOnSuccess).toHaveBeenCalled();
    });
});

test('shows loader while loading', async () => {
    // Simulate fetch never resolves
    global.fetch.mockImplementation(() => new Promise(() => {}));
    render(<FormularioRegistro onRegisterSuccess={jest.fn()} />);
    fireEvent.change(screen.getByLabelText(/Nombre/i), { target: { value: 'Juan' } });
    fireEvent.change(screen.getByLabelText(/Correo electrónico/i), { target: { value: 'juan@email.com' } });
    fireEvent.change(screen.getByLabelText(/Contraseña/i), { target: { value: '123456' } });
    fireEvent.click(screen.getByRole('button', { name: /Registrarse/i }));

    expect(screen.getByClassName ? screen.getByClassName('loader') : screen.getByText((content, element) => element.className === 'loader')).toBeInTheDocument();
});