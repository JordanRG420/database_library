package database.library.controller;

import database.library.dto.request.LibroRequest;
import database.library.dto.response.LibroResponse;
import database.library.service.LibroService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins ="*")
@RestController
@RequestMapping("/api/libros")
public class LibroController {

    @Autowired
    private LibroService libroService;

    // CREATE
    @PostMapping
    public ResponseEntity<LibroResponse> crearLibro(@RequestBody LibroRequest request) {
        LibroResponse response = libroService.crearLibro(request);
        return ResponseEntity.ok(response);
    }

    // READ ALL
    @GetMapping
    public ResponseEntity<List<LibroResponse>> listarLibros() {
        List<LibroResponse> libros = libroService.listarTodos();
        return ResponseEntity.ok(libros);
    }

    // READ BY ID
    @GetMapping("/{id}")
    public ResponseEntity<LibroResponse> obtenerLibro(@PathVariable Integer id) {
        LibroResponse libro = libroService.buscarPorId(id);
        return ResponseEntity.ok(libro);
    }

    // UPDATE
    @PutMapping("/{id}")
    public ResponseEntity<LibroResponse> actualizarLibro(
            @PathVariable Integer id,
            @RequestBody LibroRequest request) {
        LibroResponse response = libroService.actualizarLibro(id, request);
        return ResponseEntity.ok(response);
    }

    // DELETE
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarLibro(@PathVariable Integer id) {
        libroService.eliminarLibro(id);
        return ResponseEntity.noContent().build();
    }

    // BÚSQUEDA PERSONALIZADA
    @GetMapping("/buscar")
    public ResponseEntity<List<LibroResponse>> buscarLibros(
            @RequestParam(required = false) String titulo,
            @RequestParam(required = false) Integer autorId,
            @RequestParam(required = false) Integer categoriaId) {
        List<LibroResponse> libros = libroService.buscarPorFiltros(titulo, autorId, categoriaId);
        return ResponseEntity.ok(libros);
    }
}