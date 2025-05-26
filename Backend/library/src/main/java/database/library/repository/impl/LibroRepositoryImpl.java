package database.library.repository.impl;

import org.springframework.stereotype.Repository;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;

@Repository
public class LibroRepositoryImpl implements ILibroRepository {
    
    @PersistenceContext
    private EntityManager entityManager;
    
    @Override
    @Transactional
    public Integer registrarLibro(String titulo, Integer autorId, Integer categoriaId, Date fechaPublicacion) {
        return (Integer) entityManager
            .createNativeQuery("SELECT registrar_libro(:titulo, :autorId, :categoriaId, :fechaPub)")
            .setParameter("titulo", titulo)
            .setParameter("autorId", autorId)
            .setParameter("categoriaId", categoriaId)
            .setParameter("fechaPub", fechaPublicacion)
            .getSingleResult();
    }
}
