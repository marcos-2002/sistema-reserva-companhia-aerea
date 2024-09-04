package padrao_de_projeto.companhia_aerea.controllers;

import org.apache.coyote.Response;
import padrao_de_projeto.companhia_aerea.domain.Voo.Voo;
import padrao_de_projeto.companhia_aerea.domain.Voo.VooOrigemDestinoDTo;
import padrao_de_projeto.companhia_aerea.domain.Voo.VooRequestDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import padrao_de_projeto.companhia_aerea.infra.security.TokenService;
import padrao_de_projeto.companhia_aerea.iterator.IVooIterator;
import padrao_de_projeto.companhia_aerea.iterator.VooPorHorarioIterator;
import padrao_de_projeto.companhia_aerea.iterator.VooPorPrecoIterator;
import padrao_de_projeto.companhia_aerea.service.VooService;

import java.util.List;
import java.util.ArrayList;
import java.util.UUID;

@RestController
@RequestMapping("/voos")
public class VooController {

    @Autowired
    private VooService vooService;

@GetMapping
    public ResponseEntity<List<Voo>> findAll(@RequestParam(required = false) String orderBy) {
        List<Voo> list = vooService.findAll();
        
        IVooIterator iterator;
        if ("preco".equalsIgnoreCase(orderBy)) {
            iterator = new VooPorPrecoIterator(list);
        } else {
            iterator = new VooPorHorarioIterator(list);
        }

        List<Voo> sortedVoos = new ArrayList<>();
        while (!iterator.done()) {
            sortedVoos.add(iterator.next());
        }
        
        return ResponseEntity.ok().body(sortedVoos);
    }

    @PostMapping
    public ResponseEntity<Voo> postVoo(@RequestBody VooRequestDTO body){
        Voo newVoo = this.vooService.createVoo(body);
        return ResponseEntity.ok(newVoo);
    }

    @GetMapping("/search")
    public ResponseEntity<List<Voo>> procurarVoo(@RequestParam String origin, @RequestParam String destination, @RequestParam(required = false) String orderBy) {
        List<Voo> voos = this.vooService.searchFlights(origin, destination);

        IVooIterator iterator;
        if ("preco".equalsIgnoreCase(orderBy)) {
            iterator = new VooPorPrecoIterator(voos);
        } else {
            iterator = new VooPorHorarioIterator(voos);
        }

        List<Voo> sortedVoos = new ArrayList<>();
        while (!iterator.done()) {
            sortedVoos.add(iterator.next());
        }

        return ResponseEntity.ok().body(sortedVoos);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteVoo(@PathVariable UUID id) {
        this.vooService.deletarVoo(id);
        return ResponseEntity.noContent().build();
    }
    @PutMapping("/{id}")
    public ResponseEntity<Voo> atualizarVoo(@PathVariable UUID id, @RequestBody VooRequestDTO vooAtualizado) {
        Voo voo = vooService.atualizarVoo(id, vooAtualizado);
        return ResponseEntity.ok(voo); // Retorna 200 OK com o voo atualizada
    }


}
