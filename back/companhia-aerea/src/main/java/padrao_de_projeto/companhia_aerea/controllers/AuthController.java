package padrao_de_projeto.companhia_aerea.controllers;


import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import padrao_de_projeto.companhia_aerea.domain.Cliente.Cliente;
import padrao_de_projeto.companhia_aerea.domain.Cliente.LoginRequestDTO;
import padrao_de_projeto.companhia_aerea.domain.Cliente.RegisterRequestDTO;
import padrao_de_projeto.companhia_aerea.domain.Cliente.ResponseDTO;
import padrao_de_projeto.companhia_aerea.infra.security.TokenService;
import padrao_de_projeto.companhia_aerea.repositories.ClienteRespository;

import java.util.Optional;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {
    private final ClienteRespository repository;
    private final PasswordEncoder passwordEncoder;
    private final TokenService tokenService;

    @PostMapping("/login")
    public ResponseEntity login(@RequestBody LoginRequestDTO body){
        Cliente user = this.repository.findByEmail(body.email()).orElseThrow(() -> new RuntimeException("User not found"));
        if(passwordEncoder.matches(body.senha(), user.getSenha())) {
            String token = this.tokenService.generateToken(user);
            return ResponseEntity.ok(new ResponseDTO(user.getNome(),user.getEmail(),user.getCpf(), user.getDataNascimento() ,token));
        }
        return ResponseEntity.badRequest().build();
    }


    @PostMapping("/register")
    public ResponseEntity register(@RequestBody RegisterRequestDTO body){
        Optional<Cliente> user = this.repository.findByEmail(body.email());

        if(user.isEmpty()) {
            Cliente newUser = new Cliente();
            newUser.setSenha(passwordEncoder.encode(body.senha()));
            newUser.setEmail(body.email());
            newUser.setNome(body.nome());
            newUser.setCpf(body.cpf());
            newUser.setDataNascimento(body.dataNascimento());
            this.repository.save(newUser);
            String token = this.tokenService.generateToken(newUser);
            return ResponseEntity.ok(new ResponseDTO(newUser.getNome(),newUser.getEmail(),newUser.getCpf(), newUser.getDataNascimento() ,token));
        }
        return ResponseEntity.badRequest().build();
    }
}