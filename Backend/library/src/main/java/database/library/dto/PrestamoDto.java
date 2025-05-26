package database.library.dto;

import lombok.Data;
import java.time.LocalDate;

@Data
public class PrestamoDto {
    private Integer libroId;
    private Integer usuarioId;
    private LocalDate fechaPrestamo;
    private LocalDate fechaDevolucion;
}