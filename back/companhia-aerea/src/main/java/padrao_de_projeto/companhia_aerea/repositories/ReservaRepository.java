package padrao_de_projeto.companhia_aerea.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import padrao_de_projeto.companhia_aerea.domain.Reserva.Reserva;

import java.util.UUID;

public interface ReservaRepository extends JpaRepository<Reserva, UUID> {
}
