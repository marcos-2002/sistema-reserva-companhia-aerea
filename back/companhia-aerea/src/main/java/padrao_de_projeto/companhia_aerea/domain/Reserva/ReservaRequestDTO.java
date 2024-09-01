package padrao_de_projeto.companhia_aerea.domain.Reserva;

import padrao_de_projeto.companhia_aerea.domain.Voo.Voo;
import padrao_de_projeto.companhia_aerea.domain.pagamento.PagamentoRequestDTO;

import java.util.UUID;

public record ReservaRequestDTO(boolean bagagemExtra,String tipo,UUID voo) {
}
