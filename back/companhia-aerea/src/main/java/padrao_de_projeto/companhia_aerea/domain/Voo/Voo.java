package padrao_de_projeto.companhia_aerea.domain.Voo;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;
import java.util.UUID;

@Table(name = "voo")
@Entity
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class Voo {
    @Id
    @GeneratedValue
    private UUID id;
    private String origem;
    private String destino;
    private Date saida;
    private Date chegada;
    private Integer vagasNormal;
    private Integer vagasExecutiva;
    private double preçoNormal;
    private double preçoExecutiva;
}
