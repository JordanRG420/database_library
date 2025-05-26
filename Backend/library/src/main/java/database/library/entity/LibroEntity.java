package database.library.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDate;

@Data
@Entity
@Table(name = "libros")
public class LibroEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    
    @Column(nullable = false)
    private String titulo;
    
    @ManyToOne
    @JoinColumn(name = "autor_id", nullable = false)
    private AutorEntity autor;
    
    @ManyToOne
    @JoinColumn(name = "categoria_id", nullable = false)
    private CategoriaEntity categoria;
    
    @Column(nullable = false)
    private Boolean disponible = true;
    
    private LocalDate fechaPublicacion;
}