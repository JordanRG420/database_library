package database.library.dto;

import lombok.Data;
import java.time.LocalDate;

@Data
public class LibroDto {
    private String titulo;
    private Integer autorId;
    private Integer categoriaId;
    private LocalDate fechaPublicacion;
}