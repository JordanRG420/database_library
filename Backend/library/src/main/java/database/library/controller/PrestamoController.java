package database.library.controller;

import database.library.dto.request.PrestamoRequest;
import database.library.dto.response.PrestamoResponse;
import database.library.service.PrestamoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/prestamos")
public class PrestamoController {

    @Autowired
    private PrestamoService prestamoService;

    @PostMapping
    public ResponseEntity<PrestamoResponse> realizarPrestamo(@RequestBody PrestamoRequest request) {
        PrestamoResponse response = prestamoService.realizarPrestamo(request);
        return ResponseEntity.ok(response);
    }

    @PutMapping("/devolver/{id}")
    public ResponseEntity<Boolean> devolverLibro(@PathVariable Integer id) {
        boolean resultado = prestamoService.devolverLibro(id);
        return ResponseEntity.ok(resultado);
    }

    @GetMapping
    public ResponseEntity<List<PrestamoResponse>> getAllPrestamos() {
        List<PrestamoResponse> prestamos = prestamoService.getAllPrestamos();
        return ResponseEntity.ok(prestamos);
    }
}