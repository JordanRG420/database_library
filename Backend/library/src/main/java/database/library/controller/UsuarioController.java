package database.library.controller;

import database.library.dto.response.UsuarioResponse;
import database.library.entity.UsuarioEntity;
import database.library.service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/usuarios")
public class UsuarioController {

    @Autowired
    private UsuarioService usuarioService;

    @GetMapping
    public ResponseEntity<List<UsuarioResponse>> getAllUsuarios() {
        List<UsuarioResponse> usuarios = usuarioService.getAllUsuarios();
        return ResponseEntity.ok(usuarios);
    }

    @PostMapping
    public ResponseEntity<UsuarioResponse> createUsuario(@RequestBody UsuarioEntity usuario) {
        UsuarioResponse response = usuarioService.createUsuario(usuario);
        return ResponseEntity.ok(response);
    }
}