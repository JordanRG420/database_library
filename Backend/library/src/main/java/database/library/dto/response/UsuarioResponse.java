package database.library.dto.response;

import lombok.Data;

@Data
public class UsuarioResponse {
    private Integer id;
    private String username;
    // No incluimos password por seguridad
}