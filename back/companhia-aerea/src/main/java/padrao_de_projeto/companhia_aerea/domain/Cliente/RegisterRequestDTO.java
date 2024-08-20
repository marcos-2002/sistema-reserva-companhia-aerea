package padrao_de_projeto.companhia_aerea.domain.Cliente;

public record RegisterRequestDTO(String nome, String email, String senha, String cpf, String dataNascimento) {
}
