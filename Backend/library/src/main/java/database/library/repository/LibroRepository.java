package database.library.repository;

import database.library.entity.LibroEntity;

import java.time.LocalDate;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.query.Procedure;
import org.springframework.data.repository.query.Param;

public interface LibroRepository extends JpaRepository<LibroEntity, Integer> {
    
    @Procedure(name = "registrar_libro")
    Integer registrarLibro(
        @Param("p_titulo") String titulo,
        @Param("p_autor_id") Integer autorId,
        @Param("p_categoria_id") Integer categoriaId,
        @Param("p_fecha_publicacion") LocalDate fechaPublicacion
    );
}