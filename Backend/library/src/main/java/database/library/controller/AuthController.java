package database.library.controller;

import database.library.dto.request.LoginRequest;
import database.library.service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private UsuarioService usuarioService;

    @PostMapping("/login")
    public ResponseEntity<Boolean> login(@RequestBody LoginRequest request) {
        boolean isValid = usuarioService.login(request);
        return ResponseEntity.ok(isValid);
    }
}