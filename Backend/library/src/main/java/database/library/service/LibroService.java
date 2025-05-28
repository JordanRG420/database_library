package database.library.service;

import database.library.dto.request.LibroRequest;
import database.library.dto.response.LibroResponse;
import database.library.entity.*;
import database.library.exception.NotFoundException;
import database.library.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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

    @Transactional
    public LibroResponse crearLibro(LibroRequest request) {
        try {
            System.out.println("Request recibido: " + request); // Log simple

            AutorEntity autor = autorRepository.findById(request.getAutorId())
                    .orElseThrow(
                            () -> new NotFoundException("Autor con ID " + request.getAutorId() + " no encontrado"));

            System.out.println("Autor encontrado: " + autor.getNombre());

            CategoriaEntity categoria = categoriaRepository.findById(request.getCategoriaId())
                    .orElseThrow(() -> new NotFoundException(
                            "Categoría con ID " + request.getCategoriaId() + " no encontrada"));

            System.out.println("Categoría encontrada: " + categoria.getNombre());

            LibroEntity libro = new LibroEntity();
            libro.setTitulo(request.getTitulo());
            libro.setAutor(autor);
            libro.setCategoria(categoria);
            libro.setFechaPublicacion(request.getFechaPublicacion());
            libro.setDisponible(true);

            System.out.println("Guardando libro: " + libro);

            LibroEntity savedLibro = libroRepository.save(libro);
            return convertToResponse(savedLibro);
        } catch (Exception e) {
            System.err.println("Error al crear libro: " + e.getMessage());
            e.printStackTrace();
            throw e;
        }
    }

    public List<LibroResponse> listarTodos() {
        return libroRepository.findAll().stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }

    public LibroResponse buscarPorId(Integer id) {
        return libroRepository.findById(id)
                .map(this::convertToResponse)
                .orElseThrow(() -> new NotFoundException("Libro no encontrado"));
    }

    @Transactional
    public LibroResponse actualizarLibro(Integer id, LibroRequest request) {
        LibroEntity libro = libroRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Libro no encontrado"));

        if (request.getTitulo() != null) {
            libro.setTitulo(request.getTitulo());
        }

        if (request.getAutorId() != null) {
            AutorEntity autor = autorRepository.findById(request.getAutorId())
                    .orElseThrow(() -> new NotFoundException("Autor no encontrado"));
            libro.setAutor(autor);
        }

        if (request.getCategoriaId() != null) {
            CategoriaEntity categoria = categoriaRepository.findById(request.getCategoriaId())
                    .orElseThrow(() -> new NotFoundException("Categoría no encontrada"));
            libro.setCategoria(categoria);
        }

        if (request.getFechaPublicacion() != null) {
            libro.setFechaPublicacion(request.getFechaPublicacion());
        }

        LibroEntity updatedLibro = libroRepository.save(libro);
        return convertToResponse(updatedLibro);
    }

    @Transactional
    public void eliminarLibro(Integer id) {
        LibroEntity libro = libroRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Libro no encontrado"));

        // Verificar si el libro está prestado
        if (libroRepository.tienePrestamosActivos(id)) {
            throw new IllegalStateException("No se puede eliminar un libro con préstamos activos");
        }

        libroRepository.delete(libro);
    }

    public List<LibroResponse> buscarPorFiltros(String titulo, Integer autorId, Integer categoriaId) {
        return libroRepository.findByFilters(titulo, autorId, categoriaId).stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }

    private LibroResponse convertToResponse(LibroEntity libro) {
        LibroResponse response = new LibroResponse();
        response.setId(libro.getId());
        response.setTitulo(libro.getTitulo());
        response.setAutorId(libro.getAutor().getId());
        response.setAutorNombre(libro.getAutor().getNombre());
        response.setCategoriaId(libro.getCategoria().getId());
        response.setCategoriaNombre(libro.getCategoria().getNombre());
        response.setFechaPublicacion(libro.getFechaPublicacion());
        response.setDisponible(libro.getDisponible());
        return response;
    }
}