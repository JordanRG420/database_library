package database.library.repository;

import database.library.entity.AutorEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AutorRepository extends JpaRepository<AutorEntity, Integer> {
}
