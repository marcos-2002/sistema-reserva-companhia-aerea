package padrao_de_projeto.companhia_aerea.domain.Reserva;

import padrao_de_projeto.companhia_aerea.domain.Voo.Voo;

import java.util.UUID;

public record ReservaRequestDTO(boolean bagagemExtra, double preco, UUID voo) {
}
