package padrao_de_projeto.companhia_aerea.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import padrao_de_projeto.companhia_aerea.domain.pagamento.Pagamento;
import padrao_de_projeto.companhia_aerea.domain.pagamento.PagamentoBoleto;
import padrao_de_projeto.companhia_aerea.domain.pagamento.PagamentoCartao;
import padrao_de_projeto.companhia_aerea.domain.pagamento.PagamentoRequestDTO;
import padrao_de_projeto.companhia_aerea.pagamentoStrategy.PagamentoBoletoStrategy;
import padrao_de_projeto.companhia_aerea.pagamentoStrategy.PagamentoCartaoStrategy;
import padrao_de_projeto.companhia_aerea.pagamentoStrategy.PagamentoStrategy;
import padrao_de_projeto.companhia_aerea.repositories.PagamentoBoletoRepository;
import padrao_de_projeto.companhia_aerea.repositories.PagamentoCartaoRepository;

import java.util.Map;

@Service
public class PagamentoService {
    @Autowired
    private PagamentoBoletoRepository boletoRepository;

    @Autowired
    private PagamentoCartaoRepository cartaoRepository;


    private final Map<String, PagamentoStrategy> strategies;


    @Autowired
    public PagamentoService(PagamentoCartaoStrategy cartaoStrategy, PagamentoBoletoStrategy boletoStrategy) {
        this.strategies = Map.of(
                "cartao", cartaoStrategy,
                "boleto", boletoStrategy
        );
    }

    public void processarPagamento(PagamentoRequestDTO body, String tipo) {
        PagamentoStrategy strategy = strategies.get(tipo.toLowerCase());
        if (strategy == null) {
            throw new IllegalArgumentException("Tipo de pagamento desconhecido");
        }
        strategy.processarPagamento(body);
    }
}