package padrao_de_projeto.companhia_aerea.facade;

import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import padrao_de_projeto.companhia_aerea.domain.Cliente.Cliente;
import padrao_de_projeto.companhia_aerea.domain.Reserva.Reserva;
import padrao_de_projeto.companhia_aerea.domain.Reserva.ReservaRequestDTO;
import padrao_de_projeto.companhia_aerea.domain.pagamento.Pagamento;
import padrao_de_projeto.companhia_aerea.domain.pagamento.PagamentoRequestDTO;
import padrao_de_projeto.companhia_aerea.domain.pagamento.PagamentoRequestWrapper;
import padrao_de_projeto.companhia_aerea.service.PagamentoService;
import padrao_de_projeto.companhia_aerea.service.ReservaService;
import padrao_de_projeto.companhia_aerea.service.VooService;

@Service
public class ReservaFacade {
    @Autowired
    private ReservaService reservaService;
    @Autowired
    private VooService vooService;
    @Autowired
    private PagamentoService pagamentoService;

    @Transactional
    public Pagamento criarReservaComPagamento(ReservaRequestDTO reservaDTO, Cliente cliente, PagamentoRequestWrapper requestWrapper) {

        // 1. Criar a reserva
        Reserva reserva = reservaService.createReservation(reservaDTO, cliente);

        // 2. Processar o pagamento
        String tipo = requestWrapper.tipo();
        PagamentoRequestDTO data = requestWrapper.dados();

        PagamentoRequestDTO novoPagamentoRequest = new PagamentoRequestDTO(
                reserva.getId(), // Novo valor para 'reserva'
                data.codigoBoleto(),
                data.numeroCartao(),
                data.nomeTitular(),
                data.cvv()
        );
        Pagamento pg = pagamentoService.processarPagamento(novoPagamentoRequest, tipo);
        return pg;

    }
}
