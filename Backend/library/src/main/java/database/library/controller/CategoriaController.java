package database.library.controller;

import database.library.entity.CategoriaEntity;
import database.library.repository.CategoriaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/categorias")
public class CategoriaController {

    @Autowired
    private CategoriaRepository categoriaRepository;

    @GetMapping
    public List<CategoriaEntity> getAllCategorias() {
        return categoriaRepository.findAll();
    }

    @GetMapping("/{id}")
    public CategoriaEntity getCategoriaById(@PathVariable Integer id) {
        return categoriaRepository.findById(id).orElse(null);
    }

    @PostMapping
    public CategoriaEntity createCategoria(@RequestBody CategoriaEntity categoria) {
        return categoriaRepository.save(categoria);
    }

    @PutMapping("/{id}")
    public CategoriaEntity updateCategoria(@PathVariable Integer id, @RequestBody CategoriaEntity categoriaDetails) {
        CategoriaEntity categoria = categoriaRepository.findById(id).orElse(null);
        if (categoria != null) {
            categoria.setNombre(categoriaDetails.getNombre());
            categoria.setDescripcion(categoriaDetails.getDescripcion());
            return categoriaRepository.save(categoria);
        }
        return null;
    }

    @DeleteMapping("/{id}")
    public void deleteCategoria(@PathVariable Integer id) {
        categoriaRepository.deleteById(id);
    }
}
