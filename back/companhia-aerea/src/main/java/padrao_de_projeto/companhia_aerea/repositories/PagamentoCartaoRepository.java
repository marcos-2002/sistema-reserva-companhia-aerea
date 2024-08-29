package padrao_de_projeto.companhia_aerea.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import padrao_de_projeto.companhia_aerea.domain.pagamento.PagamentoCartao;

import java.util.UUID;

@Repository
public interface PagamentoCartaoRepository extends JpaRepository<PagamentoCartao, UUID> {
}
