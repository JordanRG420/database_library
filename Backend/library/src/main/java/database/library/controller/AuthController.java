package database.library.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    
    @PersistenceContext
    private EntityManager entityManager;
    
    @PostMapping("/login")
    public ResponseEntity<Boolean> login(@RequestBody LoginDTO loginDTO) {
        Boolean isValid = (Boolean) entityManager
            .createNativeQuery("SELECT verificar_login(:username, :password)")
            .setParameter("username", loginDTO.getUsername())
            .setParameter("password", loginDTO.getPassword())
            .getSingleResult();
        
        return ResponseEntity.ok(isValid);
    }
}
