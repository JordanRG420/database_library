package database.library.service;

import database.library.entity.AutorEntity;
import database.library.repository.AutorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AutorService {

    @Autowired
    private AutorRepository autorRepository;

    public List<AutorEntity> getAllAutores() {
        return autorRepository.findAll();
    }

    public AutorEntity getAutorById(Integer id) {
        return autorRepository.findById(id).orElse(null);
    }

    public AutorEntity saveAutor(AutorEntity autor) {
        return autorRepository.save(autor);
    }

    public void deleteAutor(Integer id) {
        autorRepository.deleteById(id);
    }
}
