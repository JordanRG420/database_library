package database.library.repository.impl;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.query.Procedure;
import org.springframework.data.repository.query.Param;

public interface ILibroRepository extends JpaRepository<Libro, Integer> {
    
    @Procedure(name = "registrar_libro")
    Integer registrarLibro(
        @Param("p_titulo") String titulo,
        @Param("p_autor_id") Integer autorId,
        @Param("p_categoria_id") Integer categoriaId,
        @Param("p_fecha_publicacion") Date fechaPublicacion
    );
}
