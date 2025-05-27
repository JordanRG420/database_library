package database.library.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDate;

@Data
@Entity
@Table(name = "prestamos")
public class PrestamoEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    
    @ManyToOne
    @JoinColumn(name = "libro_id", nullable = false)
    private LibroEntity libro;
    
    @ManyToOne
    @JoinColumn(name = "usuario_id", nullable = false)
    private UsuarioEntity usuario;
    
    @Column(nullable = false)
    private LocalDate fechaPrestamo = LocalDate.now();
    
    private LocalDate fechaDevolucion;
    
    @Column(nullable = false)
    private Boolean devuelto = false;
}