package database.library.repository;

import database.library.entity.PrestamoEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.query.Procedure;
import org.springframework.data.repository.query.Param;

public interface PrestamoRepository extends JpaRepository<PrestamoEntity, Integer> {
    
    @Procedure(name = "prestar_libro")
    Integer prestarLibro(
        @Param("p_libro_id") Integer libroId,
        @Param("p_usuario_id") Integer usuarioId
    );
    
    @Procedure(name = "devolver_libro")
    Boolean devolverLibro(@Param("p_prestamo_id") Integer prestamoId);
}