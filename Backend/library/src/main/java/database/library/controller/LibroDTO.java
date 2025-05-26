package database.library.controller;

import lombok.Data;
import java.util.Date;

@Data
public class LibroDTO {
    private String titulo;
    private Integer autorId;
    private Integer categoriaId;
    private Date fechaPublicacion;
}
