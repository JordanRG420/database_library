package database.library.service;

import database.library.dto.LibroDto;
import database.library.repository.LibroRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDate;

@Service
public class LibroService {
    
    @Autowired
    private LibroRepository libroRepository;
    
    public Integer registrarLibro(LibroDto libroDto) {
        return libroRepository.registrarLibro(
            libroDto.getTitulo(),
            libroDto.getAutorId(),
            libroDto.getCategoriaId(),
            libroDto.getFechaPublicacion() != null ? libroDto.getFechaPublicacion() : LocalDate.now()
        );
    }
}
