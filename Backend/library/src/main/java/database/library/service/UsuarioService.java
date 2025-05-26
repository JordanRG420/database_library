package database.library.service;

import database.library.dto.LoginDto;
import database.library.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UsuarioService {
    
    @Autowired
    private UsuarioRepository usuarioRepository;
    
    public boolean login(LoginDto loginDto) {
        Boolean isValid = usuarioRepository.verificarLogin(loginDto.getUsername(), loginDto.getPassword());
        return isValid != null && isValid;
    }
}