package database.library.repository;

import database.library.entity.PrestamoEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PrestamoRepository extends JpaRepository<PrestamoEntity, Integer> {
}