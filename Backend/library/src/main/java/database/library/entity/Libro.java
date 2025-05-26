package database.library.entity;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "libros")
public class Libro {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    
    @Column(nullable = false)
    private String titulo;
    
    @ManyToOne
    @JoinColumn(name = "autor_id", nullable = false)
    private Autor autor;
    
    @ManyToOne
    @JoinColumn(name = "categoria_id", nullable = false)
    private Categoria categoria;
    
    @Column(nullable = false)
    private Boolean disponible = true;
    
    private Date fechaPublicacion;
}
