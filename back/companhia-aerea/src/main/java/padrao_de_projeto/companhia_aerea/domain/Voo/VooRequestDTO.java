package padrao_de_projeto.companhia_aerea.domain.Voo;

import java.util.Date;

public record VooRequestDTO( String origem,
         String destino,
         Date saida,
         Date chegada,
         Integer vagas) {
}
