package database.library.service;

import database.library.dto.request.PrestamoRequest;
import database.library.dto.response.PrestamoResponse;
import database.library.entity.*;
import database.library.exception.NotFoundException;
import database.library.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class PrestamoService {

    @Autowired
    private PrestamoRepository prestamoRepository;
    
    @Autowired
    private LibroRepository libroRepository;
    
    @Autowired
    private UsuarioRepository usuarioRepository;

    @Transactional
    public PrestamoResponse crearPrestamo(PrestamoRequest request) {
        LibroEntity libro = libroRepository.findById(request.getLibroId())
            .orElseThrow(() -> new NotFoundException("Libro no encontrado"));
        
        UsuarioEntity usuario = usuarioRepository.findById(request.getUsuarioId())
            .orElseThrow(() -> new NotFoundException("Usuario no encontrado"));
        
        if (!libro.getDisponible()) {
            throw new IllegalStateException("El libro no está disponible");
        }

        PrestamoEntity prestamo = new PrestamoEntity();
        prestamo.setLibro(libro);
        prestamo.setUsuario(usuario);
        prestamo.setFechaPrestamo(LocalDate.now());
        
        libro.setDisponible(false);
        libroRepository.save(libro);
        
        PrestamoEntity savedPrestamo = prestamoRepository.save(prestamo);
        return convertToResponse(savedPrestamo);
    }

    public List<PrestamoResponse> listarTodos() {
        return prestamoRepository.findAll().stream()
            .map(this::convertToResponse)
            .collect(Collectors.toList());
    }

    public PrestamoResponse buscarPorId(Integer id) {
        return prestamoRepository.findById(id)
            .map(this::convertToResponse)
            .orElseThrow(() -> new NotFoundException("Préstamo no encontrado"));
    }

    @Transactional
    public PrestamoResponse actualizarPrestamo(Integer id, PrestamoRequest request) {
        PrestamoEntity prestamo = prestamoRepository.findById(id)
            .orElseThrow(() -> new NotFoundException("Préstamo no encontrado"));
        
        if (request.getLibroId() != null) {
            LibroEntity nuevoLibro = libroRepository.findById(request.getLibroId())
                .orElseThrow(() -> new NotFoundException("Libro no encontrado"));
            
            // Liberar el libro anterior
            prestamo.getLibro().setDisponible(true);
            libroRepository.save(prestamo.getLibro());
            
            // Asignar nuevo libro
            prestamo.setLibro(nuevoLibro);
            nuevoLibro.setDisponible(false);
            libroRepository.save(nuevoLibro);
        }
        
        if (request.getUsuarioId() != null) {
            UsuarioEntity usuario = usuarioRepository.findById(request.getUsuarioId())
                .orElseThrow(() -> new NotFoundException("Usuario no encontrado"));
            prestamo.setUsuario(usuario);
        }
        
        PrestamoEntity updatedPrestamo = prestamoRepository.save(prestamo);
        return convertToResponse(updatedPrestamo);
    }

    @Transactional
    public boolean eliminarPrestamo(Integer id) {
        PrestamoEntity prestamo = prestamoRepository.findById(id)
            .orElseThrow(() -> new NotFoundException("Préstamo no encontrado"));
        
        // Liberar el libro
        prestamo.getLibro().setDisponible(true);
        libroRepository.save(prestamo.getLibro());
        
        prestamoRepository.delete(prestamo);
        return true;
    }

    @Transactional
    public PrestamoResponse devolverLibro(Integer id) {
        PrestamoEntity prestamo = prestamoRepository.findById(id)
            .orElseThrow(() -> new NotFoundException("Préstamo no encontrado"));
        
        if (prestamo.getDevuelto()) {
            throw new IllegalStateException("El libro ya fue devuelto");
        }
        
        prestamo.setDevuelto(true);
        prestamo.setFechaDevolucion(LocalDate.now());
        
        LibroEntity libro = prestamo.getLibro();
        libro.setDisponible(true);
        libroRepository.save(libro);
        
        PrestamoEntity updatedPrestamo = prestamoRepository.save(prestamo);
        return convertToResponse(updatedPrestamo);
    }

    private PrestamoResponse convertToResponse(PrestamoEntity prestamo) {
        PrestamoResponse response = new PrestamoResponse();
        response.setId(prestamo.getId());
        response.setLibroId(prestamo.getLibro().getId());
        response.setLibroTitulo(prestamo.getLibro().getTitulo());
        response.setUsuarioId(prestamo.getUsuario().getId());
        response.setUsuarioNombre(prestamo.getUsuario().getUsername());
        response.setFechaPrestamo(prestamo.getFechaPrestamo());
        response.setFechaDevolucion(prestamo.getFechaDevolucion());
        response.setDevuelto(prestamo.getDevuelto());
        return response;
    }
}