package database.library.service;

import database.library.dto.request.LoginRequest;
import database.library.dto.response.UsuarioResponse;
import database.library.entity.UsuarioEntity;
import database.library.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    public boolean login(LoginRequest request) {
        UsuarioEntity usuario = usuarioRepository.findByUsername(request.getUsername());
        return usuario != null && usuario.getPassword().equals(request.getPassword());
    }

    public List<UsuarioResponse> getAllUsuarios() {
        return usuarioRepository.findAll().stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }

    public UsuarioResponse createUsuario(UsuarioEntity usuario) {
        UsuarioEntity savedUsuario = usuarioRepository.save(usuario);
        return convertToResponse(savedUsuario);
    }

    private UsuarioResponse convertToResponse(UsuarioEntity usuario) {
        UsuarioResponse response = new UsuarioResponse();
        response.setId(usuario.getId());
        response.setUsername(usuario.getUsername());
        return response;
    }
}