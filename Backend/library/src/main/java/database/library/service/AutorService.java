package database.library.service;

import database.library.dto.request.AutorRequest;
import database.library.dto.response.AutorResponse;
import database.library.entity.AutorEntity;
import database.library.repository.AutorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class AutorService {

    @Autowired
    private AutorRepository autorRepository;

    public AutorResponse createAutor(AutorRequest request) {
        AutorEntity autor = new AutorEntity();
        autor.setNombre(request.getNombre());
        autor.setNacionalidad(request.getNacionalidad());
        
        AutorEntity savedAutor = autorRepository.save(autor);
        return convertToResponse(savedAutor);
    }

    public List<AutorResponse> getAllAutores() {
        return autorRepository.findAll().stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }

    private AutorResponse convertToResponse(AutorEntity autor) {
        AutorResponse response = new AutorResponse();
        response.setId(autor.getId());
        response.setNombre(autor.getNombre());
        response.setNacionalidad(autor.getNacionalidad());
        return response;
    }
}