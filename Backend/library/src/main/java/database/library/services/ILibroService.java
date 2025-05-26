package database.library.services;

import database.library.controller.LibroDTO;


public interface ILibroService {
    Integer registrarLibro(LibroDTO libroDTO);
}
