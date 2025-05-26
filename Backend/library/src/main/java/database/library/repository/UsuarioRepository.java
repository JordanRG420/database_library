package database.library.repository;

import database.library.entity.UsuarioEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface UsuarioRepository extends JpaRepository<UsuarioEntity, Integer> {
    
    @Query(value = "SELECT verificar_login(:username, :password)", nativeQuery = true)
    Boolean verificarLogin(@Param("username") String username, @Param("password") String password);
    
    UsuarioEntity findByUsername(String username);
}