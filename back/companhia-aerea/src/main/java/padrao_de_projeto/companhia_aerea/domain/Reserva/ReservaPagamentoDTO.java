package padrao_de_projeto.companhia_aerea.domain.Reserva;

import padrao_de_projeto.companhia_aerea.domain.pagamento.PagamentoRequestDTO;
import padrao_de_projeto.companhia_aerea.domain.pagamento.PagamentoRequestWrapper;

public record ReservaPagamentoDTO(ReservaRequestDTO reservaRequestDTO, PagamentoRequestWrapper pagamentoRequestWrapper) {
}
