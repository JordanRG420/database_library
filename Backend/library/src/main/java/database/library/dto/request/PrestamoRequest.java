package database.library.dto.request;

import lombok.Data;
import java.time.LocalDate;

@Data
public class PrestamoRequest {
    private Integer libroId;
    private Integer usuarioId;
    private LocalDate fechaPrestamo;
}