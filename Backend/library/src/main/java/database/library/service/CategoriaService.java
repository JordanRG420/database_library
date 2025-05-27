package database.library.service;

import database.library.entity.CategoriaEntity;
import database.library.repository.CategoriaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service

public class CategoriaService {
    @Autowired
    private CategoriaRepository categoriaRepository;

    public List<CategoriaEntity> getAllCategorias() {
        return categoriaRepository.findAll();
    }

    public CategoriaEntity getCategoriaById(Integer id) {
        return categoriaRepository.findById(id).orElse(null);
    }

    public CategoriaEntity saveCategoria(CategoriaEntity categoria) {
        return categoriaRepository.save(categoria);
    }

    public void deleteCategoria(Integer id) {
        categoriaRepository.deleteById(id);
    }
}
