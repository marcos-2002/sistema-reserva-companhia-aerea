package padrao_de_projeto.companhia_aerea.domain.pagamento;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "pagamento_boleto")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PagamentoBoleto extends Pagamento {
    private String codigoBoleto;

}
