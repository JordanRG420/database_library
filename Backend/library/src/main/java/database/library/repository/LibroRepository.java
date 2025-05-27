package database.library.repository;

import database.library.entity.LibroEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LibroRepository extends JpaRepository<LibroEntity, Integer> {
}