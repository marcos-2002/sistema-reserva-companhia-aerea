package padrao_de_projeto.companhia_aerea.repositories;

import padrao_de_projeto.companhia_aerea.domain.Cliente.Cliente;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface ClienteRespository extends JpaRepository<Cliente, UUID> {
}
