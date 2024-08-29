package padrao_de_projeto.companhia_aerea.domain.pagamento;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import padrao_de_projeto.companhia_aerea.domain.Reserva.Reserva;



import java.math.BigDecimal;
import java.util.Date;
import java.util.UUID;

@Entity
@Table(name = "pagamento")
@Inheritance(strategy = InheritanceType.TABLE_PER_CLASS)
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public abstract class Pagamento {

    @Id
    @GeneratedValue
    private UUID id;
    private double valor;

    @OneToOne
    @JoinColumn(name = "reserva_id")
    private Reserva reserva;

}
