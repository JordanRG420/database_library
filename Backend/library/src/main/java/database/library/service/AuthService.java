package database.library.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import database.library.dto.request.LoginRequest;
import database.library.dto.response.AuthResponse;
import database.library.entity.UsuarioEntity;
import database.library.repository.UsuarioRepository;

@Service
public class AuthService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    public AuthResponse verificarCredenciales(LoginRequest request) {
        AuthResponse response = new AuthResponse();
        
        UsuarioEntity usuario = usuarioRepository.findByUsername(request.getUsername());
        
        if(usuario == null) {
            response.setMensaje("Usuario no encontrado");
            response.setAutenticado(false);
            return response;
        }
        
        if(!usuario.getPassword().equals(request.getPassword())) {
            response.setMensaje("Contraseña incorrecta");
            response.setAutenticado(false);
            return response;
        }
        
        response.setUsuarioId(usuario.getId());
        response.setUsername(usuario.getUsername());
        response.setAutenticado(true);
        response.setMensaje("Autenticación exitosa");
        
        return response;
    }
}
