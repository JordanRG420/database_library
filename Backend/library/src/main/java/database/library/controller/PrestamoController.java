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

    // CREATE
    @PostMapping
    public ResponseEntity<PrestamoResponse> crearPrestamo(@RequestBody PrestamoRequest request) {
        PrestamoResponse response = prestamoService.crearPrestamo(request);
        return ResponseEntity.ok(response);
    }

    // READ
    @GetMapping
    public ResponseEntity<List<PrestamoResponse>> listarPrestamos() {
        List<PrestamoResponse> prestamos = prestamoService.listarTodos();
        return ResponseEntity.ok(prestamos);
    }

    @GetMapping("/{id}")
    public ResponseEntity<PrestamoResponse> obtenerPrestamo(@PathVariable Integer id) {
        PrestamoResponse prestamo = prestamoService.buscarPorId(id);
        return prestamo != null ? ResponseEntity.ok(prestamo) : ResponseEntity.notFound().build();
    }

    // UPDATE
    @PutMapping("/{id}")
    public ResponseEntity<PrestamoResponse> actualizarPrestamo(
            @PathVariable Integer id,
            @RequestBody PrestamoRequest request) {
        PrestamoResponse response = prestamoService.actualizarPrestamo(id, request);
        return response != null ? ResponseEntity.ok(response) : ResponseEntity.notFound().build();
    }

    // DELETE
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarPrestamo(@PathVariable Integer id) {
        boolean eliminado = prestamoService.eliminarPrestamo(id);
        return eliminado ? ResponseEntity.noContent().build() : ResponseEntity.notFound().build();
    }

    // Endpoint específico para devolución
    @PutMapping("/{id}/devolver")
    public ResponseEntity<PrestamoResponse> devolverLibro(@PathVariable Integer id) {
        PrestamoResponse response = prestamoService.devolverLibro(id);
        return response != null ? ResponseEntity.ok(response) : ResponseEntity.notFound().build();
    }
}