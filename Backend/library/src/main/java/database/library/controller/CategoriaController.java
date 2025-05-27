package database.library.controller;

import database.library.dto.request.CategoriaRequest;
import database.library.dto.response.CategoriaResponse;
import database.library.service.CategoriaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/categorias")
public class CategoriaController {

    @Autowired
    private CategoriaService categoriaService;

    @PostMapping
    public ResponseEntity<CategoriaResponse> createCategoria(@RequestBody CategoriaRequest request) {
        CategoriaResponse response = categoriaService.createCategoria(request);
        return ResponseEntity.ok(response);
    }

    @GetMapping
    public ResponseEntity<List<CategoriaResponse>> getAllCategorias() {
        List<CategoriaResponse> categorias = categoriaService.getAllCategorias();
        return ResponseEntity.ok(categorias);
    }
}