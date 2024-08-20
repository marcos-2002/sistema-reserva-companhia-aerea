package padrao_de_projeto.companhia_aerea.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import padrao_de_projeto.companhia_aerea.domain.Cliente.Cliente;
import padrao_de_projeto.companhia_aerea.infra.security.TokenService;

import java.util.Optional;

@RestController
@RequestMapping("/cliente")
public class ClienteController {

    @Autowired
    private TokenService tokenService;


    @GetMapping
    public ResponseEntity<String> getUser(@RequestHeader("Authorization") String authorizationHeader) {
        String token = authorizationHeader.replace("Bearer ", "");
        String email = tokenService.validateToken(token);
        return ResponseEntity.ok(email);
    }
}
