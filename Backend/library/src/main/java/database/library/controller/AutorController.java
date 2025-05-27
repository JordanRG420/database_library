package database.library.controller;

import database.library.entity.AutorEntity;
import database.library.repository.AutorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/autores")
public class AutorController {

    @Autowired
    private AutorRepository autorRepository;

    @GetMapping
    public List<AutorEntity> getAllAutores() {
        return autorRepository.findAll();
    }

    @GetMapping("/{id}")
    public AutorEntity getAutorById(@PathVariable Integer id) {
        return autorRepository.findById(id).orElse(null);
    }

    @PostMapping
    public AutorEntity createAutor(@RequestBody AutorEntity autor) {
        return autorRepository.save(autor);
    }

    @PutMapping("/{id}")
    public AutorEntity updateAutor(@PathVariable Integer id, @RequestBody AutorEntity autorDetails) {
        AutorEntity autor = autorRepository.findById(id).orElse(null);
        if (autor != null) {
            autor.setNombre(autorDetails.getNombre());
            autor.setNacionalidad(autorDetails.getNacionalidad());
            return autorRepository.save(autor);
        }
        return null;
    }

    @DeleteMapping("/{id}")
    public void deleteAutor(@PathVariable Integer id) {
        autorRepository.deleteById(id);
    }
}
