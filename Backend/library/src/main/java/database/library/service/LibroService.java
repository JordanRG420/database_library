package database.library.service;

import database.library.dto.request.LibroRequest;
import database.library.dto.response.LibroResponse;
import database.library.entity.*;
import database.library.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class LibroService {

    @Autowired
    private LibroRepository libroRepository;
    
    @Autowired
    private AutorRepository autorRepository;
    
    @Autowired
    private CategoriaRepository categoriaRepository;

    public LibroResponse registrarLibro(LibroRequest request) {
        AutorEntity autor = autorRepository.findById(request.getAutorId())
            .orElseThrow(() -> new RuntimeException("Autor no encontrado"));
        
        CategoriaEntity categoria = categoriaRepository.findById(request.getCategoriaId())
            .orElseThrow(() -> new RuntimeException("Categoría no encontrada"));
        
        LibroEntity libro = new LibroEntity();
        libro.setTitulo(request.getTitulo());
        libro.setAutor(autor);
        libro.setCategoria(categoria);
        libro.setFechaPublicacion(request.getFechaPublicacion());
        libro.setDisponible(true);
        
        LibroEntity savedLibro = libroRepository.save(libro);
        return convertToResponse(savedLibro);
    }

    public List<LibroResponse> getAllLibros() {
        return libroRepository.findAll().stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }

    public LibroResponse getLibroById(Integer id) {
        return libroRepository.findById(id)
                .map(this::convertToResponse)
                .orElse(null);
    }

    private LibroResponse convertToResponse(LibroEntity libro) {
        LibroResponse response = new LibroResponse();
        response.setId(libro.getId());
        response.setTitulo(libro.getTitulo());
        response.setAutorId(libro.getAutor().getId());
        response.setAutorNombre(libro.getAutor().getNombre());
        response.setCategoriaId(libro.getCategoria().getId());
        response.setCategoriaNombre(libro.getCategoria().getNombre());
        response.setDisponible(libro.getDisponible());
        response.setFechaPublicacion(libro.getFechaPublicacion());
        return response;
    }
}