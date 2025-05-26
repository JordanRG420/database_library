package database.library.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@Configuration
@EnableJpaRepositories(basePackages = "com.biblioteca.repository")
public class PostgreSQLConfig {
    // Configuración adicional si es necesaria

    
    //agregar las peticiones 
}
