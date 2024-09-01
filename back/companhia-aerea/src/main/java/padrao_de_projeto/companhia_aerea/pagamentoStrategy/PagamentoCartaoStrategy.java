package padrao_de_projeto.companhia_aerea.pagamentoStrategy;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import padrao_de_projeto.companhia_aerea.domain.Reserva.Reserva;
import padrao_de_projeto.companhia_aerea.domain.pagamento.Pagamento;
import padrao_de_projeto.companhia_aerea.domain.pagamento.PagamentoCartao;
import padrao_de_projeto.companhia_aerea.domain.pagamento.PagamentoRequestDTO;
import padrao_de_projeto.companhia_aerea.repositories.PagamentoCartaoRepository;
import padrao_de_projeto.companhia_aerea.repositories.ReservaRepository;

import java.util.Date;
import java.util.Optional;

@Service
public class PagamentoCartaoStrategy implements PagamentoStrategy {

    @Autowired
    private PagamentoCartaoRepository pagamentoCartaoRepository;

    @Autowired
    private ReservaRepository reservaRepository;

    @Override
    public Pagamento processarPagamento(PagamentoRequestDTO body) {
        PagamentoCartao pg = new PagamentoCartao();

        pg.setCvv(body.cvv());
        pg.setNumeroCartao(body.numeroCartao());
        pg.setNomeTitular(body.nomeTitular());

        Reserva reserva = reservaRepository.findById(body.reserva()).orElseThrow(() -> new RuntimeException("Reserva não encontrada"));
        pg.setValor(reserva.getPreco());
        pg.setReserva(reserva);

        pagamentoCartaoRepository.save(pg);
        return pg;
    }
}
