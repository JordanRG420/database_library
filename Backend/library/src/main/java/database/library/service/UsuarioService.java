package database.library.service;

import database.library.dto.request.UsuarioRequest;
import database.library.dto.response.UsuarioResponse;
import database.library.entity.UsuarioEntity;
import database.library.exception.NotFoundException;
import database.library.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    public UsuarioResponse crearUsuario(UsuarioRequest request) {
        if (usuarioRepository.existsByUsername(request.getUsername())) {
            throw new IllegalStateException("El nombre de usuario ya existe");
        }

        UsuarioEntity usuario = new UsuarioEntity();
        usuario.setUsername(request.getUsername());
        usuario.setPassword(request.getPassword());

        UsuarioEntity savedUsuario = usuarioRepository.save(usuario);
        return convertToResponse(savedUsuario);
    }

    public List<UsuarioResponse> listarTodos() {
        return usuarioRepository.findAll().stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }

    public UsuarioResponse buscarPorId(Integer id) {
        return usuarioRepository.findById(id)
                .map(this::convertToResponse)
                .orElseThrow(() -> new NotFoundException("Usuario no encontrado"));
    }

    public UsuarioResponse actualizarUsuario(Integer id, UsuarioRequest request) {
        UsuarioEntity usuario = usuarioRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Usuario no encontrado"));

        if (request.getUsername() != null) {
            if (usuarioRepository.existsByUsernameAndIdNot(request.getUsername(), id)) {
                throw new IllegalStateException("El nombre de usuario ya está en uso");
            }
            usuario.setUsername(request.getUsername());
        }

        if (request.getPassword() != null) {
            usuario.setPassword(request.getPassword());
        }

        UsuarioEntity updatedUsuario = usuarioRepository.save(usuario);
        return convertToResponse(updatedUsuario);
    }

    public boolean eliminarUsuario(Integer id) {
        if (!usuarioRepository.existsById(id)) {
            throw new NotFoundException("Usuario no encontrado");
        }

        // Verificar si tiene préstamos activos
        if (usuarioRepository.tienePrestamosActivos(id)) {
            throw new IllegalStateException("No se puede eliminar usuario con préstamos activos");
        }

        usuarioRepository.deleteById(id);
        return true;
    }

    private UsuarioResponse convertToResponse(UsuarioEntity usuario) {
        UsuarioResponse response = new UsuarioResponse();
        response.setId(usuario.getId());
        response.setUsername(usuario.getUsername());
        return response;
    }
}