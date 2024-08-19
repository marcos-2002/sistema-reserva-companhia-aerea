package padrao_de_projeto.companhia_aerea.domain.Voo;

import java.util.Date;

public record VooRequestDTO(String origem, String destino, Long saida, Long chegada, int vagas) {
}
