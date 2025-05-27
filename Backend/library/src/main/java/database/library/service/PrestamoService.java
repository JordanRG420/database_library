package database.library.service;

import database.library.dto.request.PrestamoRequest;
import database.library.dto.response.PrestamoResponse;
import database.library.entity.*;
import database.library.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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

    public PrestamoResponse realizarPrestamo(PrestamoRequest request) {
        LibroEntity libro = libroRepository.findById(request.getLibroId())
            .orElseThrow(() -> new RuntimeException("Libro no encontrado"));
        
        UsuarioEntity usuario = usuarioRepository.findById(request.getUsuarioId())
            .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
        
        PrestamoEntity prestamo = new PrestamoEntity();
        prestamo.setLibro(libro);
        prestamo.setUsuario(usuario);
        prestamo.setFechaPrestamo(request.getFechaPrestamo() != null ? 
            request.getFechaPrestamo() : LocalDate.now());
        prestamo.setDevuelto(false);
        
        // Actualizar disponibilidad del libro
        libro.setDisponible(false);
        libroRepository.save(libro);
        
        PrestamoEntity savedPrestamo = prestamoRepository.save(prestamo);
        return convertToResponse(savedPrestamo);
    }

    public boolean devolverLibro(Integer prestamoId) {
        PrestamoEntity prestamo = prestamoRepository.findById(prestamoId)
            .orElseThrow(() -> new RuntimeException("Préstamo no encontrado"));
        
        prestamo.setDevuelto(true);
        prestamo.setFechaDevolucion(LocalDate.now());
        
        // Actualizar disponibilidad del libro
        LibroEntity libro = prestamo.getLibro();
        libro.setDisponible(true);
        libroRepository.save(libro);
        
        prestamoRepository.save(prestamo);
        return true;
    }

    public List<PrestamoResponse> getAllPrestamos() {
        return prestamoRepository.findAll().stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
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