package database.library.controller;

import database.library.dto.request.LoginRequest;
import database.library.dto.response.AuthResponse;
import database.library.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins ="*")
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody LoginRequest request) {
        AuthResponse response = authService.verificarCredenciales(request);
        return response != null ? ResponseEntity.ok(response) : ResponseEntity.status(401).build();
    }
}