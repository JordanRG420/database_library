package database.library.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import database.library.services.ILibroService;

@RestController
@RequestMapping("/api/libros")
public class LibroController {
    
    @Autowired
    private ILibroService libroService;
    
    @PostMapping
    public ResponseEntity<Integer> registrarLibro(@RequestBody LibroDTO libroDTO) {
        Integer libroId = libroService.registrarLibro(libroDTO);
        return ResponseEntity.ok(libroId);
    }
}