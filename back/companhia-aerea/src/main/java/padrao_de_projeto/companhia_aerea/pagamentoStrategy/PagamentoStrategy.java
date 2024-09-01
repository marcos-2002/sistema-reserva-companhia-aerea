package padrao_de_projeto.companhia_aerea.pagamentoStrategy;

import padrao_de_projeto.companhia_aerea.domain.pagamento.Pagamento;
import padrao_de_projeto.companhia_aerea.domain.pagamento.PagamentoBoleto;
import padrao_de_projeto.companhia_aerea.domain.pagamento.PagamentoRequestDTO;

public interface PagamentoStrategy {
    Pagamento processarPagamento(PagamentoRequestDTO data);
}
