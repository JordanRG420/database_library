package database.library.dto.response;

import lombok.Data;
import java.time.LocalDate;

@Data
public class LibroResponse {
    private Integer id;
    private String titulo;
    private Integer autorId;
    private String autorNombre;
    private Integer categoriaId;
    private String categoriaNombre;
    private Boolean disponible;
    private LocalDate fechaPublicacion;
}