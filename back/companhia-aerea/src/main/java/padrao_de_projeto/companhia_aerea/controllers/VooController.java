package padrao_de_projeto.companhia_aerea.controllers;

import padrao_de_projeto.companhia_aerea.domain.Voo.Voo;
import padrao_de_projeto.companhia_aerea.domain.Voo.VooRequestDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import padrao_de_projeto.companhia_aerea.service.VooService;

import java.util.List;

@RestController
@RequestMapping("/voos")
public class VooController {

    @Autowired
    private VooService vooService;

    @GetMapping
    public ResponseEntity<List<Voo>> findAll() {
        List<Voo> list = vooService.findAll();
        return ResponseEntity.ok().body(list);
    }

    @PostMapping
    public ResponseEntity<Voo> postVoo(@RequestBody VooRequestDTO body){

        Voo newVoo = this.vooService.createVoo(body);
        return ResponseEntity.ok(newVoo);
    }
}
