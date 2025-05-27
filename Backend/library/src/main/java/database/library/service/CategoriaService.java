package database.library.service;

import database.library.dto.request.CategoriaRequest;
import database.library.dto.response.CategoriaResponse;
import database.library.entity.CategoriaEntity;
import database.library.repository.CategoriaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CategoriaService {

    @Autowired
    private CategoriaRepository categoriaRepository;

    public CategoriaResponse createCategoria(CategoriaRequest request) {
        CategoriaEntity categoria = new CategoriaEntity();
        categoria.setNombre(request.getNombre());
        categoria.setDescripcion(request.getDescripcion());
        
        CategoriaEntity savedCategoria = categoriaRepository.save(categoria);
        return convertToResponse(savedCategoria);
    }

    public List<CategoriaResponse> getAllCategorias() {
        return categoriaRepository.findAll().stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }

    private CategoriaResponse convertToResponse(CategoriaEntity categoria) {
        CategoriaResponse response = new CategoriaResponse();
        response.setId(categoria.getId());
        response.setNombre(categoria.getNombre());
        response.setDescripcion(categoria.getDescripcion());
        return response;
    }
}