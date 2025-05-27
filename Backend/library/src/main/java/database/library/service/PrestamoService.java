package database.library.service;

import database.library.dto.PrestamoDto;
import database.library.repository.PrestamoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PrestamoService {

    @Autowired
    private PrestamoRepository prestamoRepository;

    public Integer realizarPrestamo(PrestamoDto prestamoDto) {
        return prestamoRepository.prestarLibro(
            prestamoDto.getLibroId(),
            prestamoDto.getUsuarioId()
        );
    }

    public boolean devolverLibro(Integer prestamoId) {
        Boolean resultado = prestamoRepository.devolverLibro(prestamoId);
        return resultado != null && resultado;
    }

    public PrestamoDto obtenerPrestamoPorId(Integer id) {
        // Implementar lógica para obtener un préstamo
        // Esto es un placeholder - deberás adaptarlo a tu estructura real
        return new PrestamoDto();
    }
}