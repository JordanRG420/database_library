package database.library.controller;

import database.library.entity.UsuarioEntity;
import database.library.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/usuarios")
public class UsuarioController {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @GetMapping
    public List<UsuarioEntity> getAllUsuarios() {
        return usuarioRepository.findAll();
    }

    @GetMapping("/{id}")
    public UsuarioEntity getUsuarioById(@PathVariable Integer id) {
        return usuarioRepository.findById(id).orElse(null);
    }

    @PostMapping
    public UsuarioEntity createUsuario(@RequestBody UsuarioEntity usuario) {
        return usuarioRepository.save(usuario);
    }

    @PutMapping("/{id}")
    public UsuarioEntity updateUsuario(@PathVariable Integer id, @RequestBody UsuarioEntity usuarioDetails) {
        UsuarioEntity usuario = usuarioRepository.findById(id).orElse(null);
        if (usuario != null) {
            usuario.setUsername(usuarioDetails.getUsername());
            usuario.setPassword(usuarioDetails.getPassword());
            return usuarioRepository.save(usuario);
        }
        return null;
    }

    @DeleteMapping("/{id}")
    public void deleteUsuario(@PathVariable Integer id) {
        usuarioRepository.deleteById(id);
    }
}
