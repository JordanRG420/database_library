package database.library.dto.request;

import jakarta.validation.constraints.*;
import lombok.Data;
import java.time.LocalDate;

@Data
public class LibroRequest {
    @NotBlank(message = "El título es obligatorio")
    @Size(max = 200, message = "El título no puede exceder los 200 caracteres")
    private String titulo;

    @NotNull(message = "El autor es obligatorio")
    private Integer autorId;

    @NotNull(message = "La categoría es obligatoria")
    private Integer categoriaId;

    private LocalDate fechaPublicacion;
}