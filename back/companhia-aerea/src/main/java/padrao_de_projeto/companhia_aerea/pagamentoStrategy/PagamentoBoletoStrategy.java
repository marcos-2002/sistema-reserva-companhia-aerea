package padrao_de_projeto.companhia_aerea.pagamentoStrategy;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.support.SimpleJpaRepository;
import org.springframework.stereotype.Service;
import padrao_de_projeto.companhia_aerea.domain.Reserva.Reserva;
import padrao_de_projeto.companhia_aerea.domain.pagamento.Pagamento;
import padrao_de_projeto.companhia_aerea.domain.pagamento.PagamentoBoleto;
import padrao_de_projeto.companhia_aerea.domain.pagamento.PagamentoRequestDTO;
import padrao_de_projeto.companhia_aerea.repositories.PagamentoBoletoRepository;
import padrao_de_projeto.companhia_aerea.repositories.PagamentoCartaoRepository;
import padrao_de_projeto.companhia_aerea.repositories.ReservaRepository;

import java.util.Date;
import java.util.UUID;

@Service
public class PagamentoBoletoStrategy implements PagamentoStrategy {

    @Autowired
    private PagamentoBoletoRepository pagamentoBoletoRepository;

    @Autowired
    private ReservaRepository reservaRepository;

    @Override
    public void processarPagamento(PagamentoRequestDTO body) {
        PagamentoBoleto pg = new PagamentoBoleto();
        pg.setValor(body.valor());
        pg.setCodigoBoleto(body.codigoBoleto());

        Reserva reserva = reservaRepository.findById(body.reserva()).orElseThrow(() -> new RuntimeException("Reserva não encontrada"));
        pg.setReserva(reserva);

        pagamentoBoletoRepository.save(pg);
    }
}