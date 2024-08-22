package padrao_de_projeto.companhia_aerea.domain.Reserva;

import padrao_de_projeto.companhia_aerea.domain.Cliente.Cliente;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import padrao_de_projeto.companhia_aerea.domain.Voo.Voo;

import java.util.UUID;

@Entity
@Table(name = "reserva")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Reserva {

    @Id
    @GeneratedValue
    private UUID id;
    private boolean bagagemExtra;
    private double preco;

    @ManyToOne
    @JoinColumn(name = "voo_id")
    private Voo voo;

    @ManyToOne
    @JoinColumn(name = "cliente_id")
    private Cliente cliente;
}
