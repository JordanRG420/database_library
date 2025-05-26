package database.library.controller;

import database.library.dto.LibroDto;
import database.library.service.LibroService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/libros")
public class LibroController {
    
    @Autowired
    private LibroService libroService;
    
    @PostMapping
    public ResponseEntity<Integer> registrarLibro(@RequestBody LibroDto libroDto) {
        Integer libroId = libroService.registrarLibro(libroDto);
        return ResponseEntity.ok(libroId);
    }
}