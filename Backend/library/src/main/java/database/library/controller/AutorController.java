package database.library.controller;

import database.library.dto.request.AutorRequest;
import database.library.dto.response.AutorResponse;
import database.library.service.AutorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/autores")
public class AutorController {

    @Autowired
    private AutorService autorService;

    @PostMapping
    public ResponseEntity<AutorResponse> createAutor(@RequestBody AutorRequest request) {
        AutorResponse response = autorService.createAutor(request);
        return ResponseEntity.ok(response);
    }

    @GetMapping
    public ResponseEntity<List<AutorResponse>> getAllAutores() {
        List<AutorResponse> autores = autorService.getAllAutores();
        return ResponseEntity.ok(autores);
    }
}