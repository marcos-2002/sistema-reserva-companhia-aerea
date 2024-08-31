package padrao_de_projeto.companhia_aerea.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import padrao_de_projeto.companhia_aerea.domain.pagamento.PagamentoBoleto;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface PagamentoBoletoRepository extends JpaRepository<PagamentoBoleto, UUID> {
    Optional<PagamentoBoleto> findByReserva_Id(UUID reserva_ID);
}
