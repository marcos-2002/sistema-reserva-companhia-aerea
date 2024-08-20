package padrao_de_projeto.companhia_aerea.repositories;

import padrao_de_projeto.companhia_aerea.domain.Voo.Voo;
import org.springframework.data.jpa.repository.JpaRepository;


import java.util.List;
import java.util.UUID;

public interface VooRepository extends JpaRepository<Voo, UUID> {
    List<Voo> findByOrigemAndDestino(String origem, String destino);
}
