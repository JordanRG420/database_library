package database.library.controller;

import database.library.dto.request.LibroRequest;
import database.library.dto.response.LibroResponse;
import database.library.service.LibroService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/libros")
public class LibroController {

    @Autowired
    private LibroService libroService;

    @PostMapping
    public ResponseEntity<LibroResponse> registrarLibro(@RequestBody LibroRequest request) {
        LibroResponse response = libroService.registrarLibro(request);
        return ResponseEntity.ok(response);
    }

    @GetMapping
    public ResponseEntity<List<LibroResponse>> getAllLibros() {
        List<LibroResponse> libros = libroService.getAllLibros();
        return ResponseEntity.ok(libros);
    }

    @GetMapping("/{id}")
    public ResponseEntity<LibroResponse> getLibroById(@PathVariable Integer id) {
        LibroResponse libro = libroService.getLibroById(id);
        return libro != null ? ResponseEntity.ok(libro) : ResponseEntity.notFound().build();
    }
}