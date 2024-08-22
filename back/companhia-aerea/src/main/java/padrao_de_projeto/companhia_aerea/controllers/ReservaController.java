package padrao_de_projeto.companhia_aerea.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import padrao_de_projeto.companhia_aerea.domain.Cliente.Cliente;
import padrao_de_projeto.companhia_aerea.domain.Reserva.Reserva;
import padrao_de_projeto.companhia_aerea.domain.Reserva.ReservaRequestDTO;
import padrao_de_projeto.companhia_aerea.infra.security.TokenService;
import padrao_de_projeto.companhia_aerea.service.ReservaService;

import java.util.List;

@RestController
@RequestMapping("/reserva")
public class ReservaController {

    @Autowired
    private ReservaService reservaService;

    @PostMapping
    public ResponseEntity<?> criarReserva(@RequestBody ReservaRequestDTO body, @AuthenticationPrincipal Cliente cliente){
        try {
            Reserva reserva = reservaService.createReservation(body, cliente);
            return ResponseEntity.ok(reserva);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping
    public ResponseEntity<List<Reserva>> listarReservas(@AuthenticationPrincipal Cliente cliente){
        List<Reserva> reservas = reservaService.findByCliente(cliente);
        return ResponseEntity.ok(reservas);
    }

}