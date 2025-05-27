package database.library.dto.response;

import lombok.Data;
import java.time.LocalDate;

@Data
public class PrestamoResponse {
    private Integer id;
    private Integer libroId;
    private String libroTitulo;
    private Integer usuarioId;
    private String usuarioNombre;
    private LocalDate fechaPrestamo;
    private LocalDate fechaDevolucion;
    private Boolean devuelto;
}