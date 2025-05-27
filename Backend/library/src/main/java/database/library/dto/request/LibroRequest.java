package database.library.dto.request;

import lombok.Data;
import java.time.LocalDate;

@Data
public class LibroRequest {
    private String titulo;
    private Integer autorId;
    private Integer categoriaId;
    private LocalDate fechaPublicacion;
}