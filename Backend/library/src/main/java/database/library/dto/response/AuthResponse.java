package database.library.dto.response;

import lombok.Data;

@Data
public class AuthResponse {
    private Integer usuarioId;
    private String username;
    private boolean autenticado;
    private String mensaje;
}