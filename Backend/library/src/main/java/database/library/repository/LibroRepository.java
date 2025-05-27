package database.library.repository;

import database.library.entity.LibroEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface LibroRepository extends JpaRepository<LibroEntity, Integer> {

    @Query("SELECT libro FROM LibroEntity libro WHERE " +
       "(:titulo IS NULL OR LOWER(libro.titulo) LIKE LOWER(CONCAT('%', :titulo, '%'))) AND " +
       "(:autorId IS NULL OR libro.autor.id = :autorId) AND " +
       "(:categoriaId IS NULL OR libro.categoria.id = :categoriaId)")
    List<LibroEntity> findByFilters(
        @Param("titulo") String titulo,
        @Param("autorId") Integer autorId,
        @Param("categoriaId") Integer categoriaId);

    @Query("SELECT COUNT(p) > 0 FROM PrestamoEntity p WHERE p.libro.id = :libroId AND p.devuelto = false")
    boolean tienePrestamosActivos(@Param("libroId") Integer libroId);
}