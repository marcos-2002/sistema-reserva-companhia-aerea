package padrao_de_projeto.companhia_aerea.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import padrao_de_projeto.companhia_aerea.domain.pagamento.Pagamento;
import padrao_de_projeto.companhia_aerea.domain.pagamento.PagamentoRequestDTO;
import padrao_de_projeto.companhia_aerea.domain.pagamento.PagamentoRequestWrapper;
import padrao_de_projeto.companhia_aerea.service.PagamentoService;

@RestController
@RequestMapping("/pagamentos")
public class PagamentoController {

    @Autowired
    private PagamentoService pagamentoService;

    @Autowired
    public PagamentoController(PagamentoService pagamentoService) {
        this.pagamentoService = pagamentoService;
    }

    @PostMapping("/processar")
    public ResponseEntity processarPagamento(@RequestBody PagamentoRequestWrapper requestWrapper) {
        String tipo = requestWrapper.tipo();
        PagamentoRequestDTO data = requestWrapper.dados();
        try {
            pagamentoService.processarPagamento(data, tipo);
            return ResponseEntity.ok().build();
        }catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }

    }
}
