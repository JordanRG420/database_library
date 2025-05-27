package database.library.entity;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "categoria")
public class CategoriaEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(unique = true, nullable = false, length = 100)
    private String nombre;

    @Column(length = 500)
    private String descripcion;

    // Constructor vacío necesario para JPA
    public CategoriaEntity() {
    }

    // Constructor con parámetros para facilidad de creación
    public CategoriaEntity(String nombre, String descripcion) {
        this.nombre = nombre;
        this.descripcion = descripcion;
    }
}
