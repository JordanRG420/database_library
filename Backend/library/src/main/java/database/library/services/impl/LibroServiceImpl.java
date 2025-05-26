package database.library.services.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class LibroServiceImpl implements ILibroService {
    
    @Autowired
    private ILibroRepository libroRepository;
    
    @Override
    public Integer registrarLibro(LibroDTO libroDTO) {
        return libroRepository.registrarLibro(
            libroDTO.getTitulo(),
            libroDTO.getAutorId(),
            libroDTO.getCategoriaId(),
            libroDTO.getFechaPublicacion()
        );
    }
}
