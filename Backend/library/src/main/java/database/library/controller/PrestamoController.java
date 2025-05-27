package database.library.controller;


import database.library.dto.PrestamoDto;
import database.library.service.PrestamoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/prestamos")
public class PrestamoController {

    @Autowired
    private PrestamoService prestamoService;

    @PostMapping("/prestar")
    public ResponseEntity<Integer> prestarLibro(@RequestBody PrestamoDto prestamoDto) {
        Integer prestamoId = prestamoService.realizarPrestamo(prestamoDto);
        return ResponseEntity.ok(prestamoId);
    }

    @PutMapping("/devolver/{id}")
    public ResponseEntity<Boolean> devolverLibro(@PathVariable Integer id) {
        boolean resultado = prestamoService.devolverLibro(id);
        return ResponseEntity.ok(resultado);
    }

    @GetMapping("/{id}")
    public ResponseEntity<PrestamoDto> obtenerPrestamo(@PathVariable Integer id) {
        PrestamoDto prestamo = prestamoService.obtenerPrestamoPorId(id);
        return ResponseEntity.ok(prestamo);
    }
}
