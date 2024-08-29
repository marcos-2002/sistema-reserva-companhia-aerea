package padrao_de_projeto.companhia_aerea.domain.pagamento;

public record PagamentoRequestWrapper(
        String tipo,
        PagamentoRequestDTO dados
){}
