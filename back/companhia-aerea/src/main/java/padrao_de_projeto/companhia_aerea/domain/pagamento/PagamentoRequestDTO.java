package padrao_de_projeto.companhia_aerea.domain.pagamento;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.UUID;

public record PagamentoRequestDTO(double valor,
                                  UUID reserva,
                                  String codigoBoleto,
                                  String numeroCartao,
                                  String nomeTitular,
                                  String cvv) {
}
