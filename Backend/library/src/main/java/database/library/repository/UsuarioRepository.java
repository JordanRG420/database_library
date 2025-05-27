package database.library.repository;

import database.library.entity.UsuarioEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface UsuarioRepository extends JpaRepository<UsuarioEntity, Integer> {
    UsuarioEntity findByUsername(String username);
    boolean existsByUsername(String username);
    boolean existsByUsernameAndIdNot(String username, Integer id);
    
    @Query("SELECT COUNT(p) > 0 FROM PrestamoEntity p WHERE p.usuario.id = :usuarioId AND p.devuelto = false")
    boolean tienePrestamosActivos(Integer usuarioId);
}