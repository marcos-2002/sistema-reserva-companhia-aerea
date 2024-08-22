package padrao_de_projeto.companhia_aerea.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import padrao_de_projeto.companhia_aerea.domain.Cliente.Cliente;
import padrao_de_projeto.companhia_aerea.domain.Reserva.Reserva;
import padrao_de_projeto.companhia_aerea.domain.Reserva.ReservaRequestDTO;
import padrao_de_projeto.companhia_aerea.domain.Voo.Voo;
import padrao_de_projeto.companhia_aerea.repositories.ClienteRespository;
import padrao_de_projeto.companhia_aerea.repositories.ReservaRepository;
import padrao_de_projeto.companhia_aerea.repositories.VooRepository;

import java.util.List;
import java.util.Optional;

@Service
public class ReservaService {

    @Autowired
    private ReservaRepository repository;

    @Autowired
    private VooService vooService;

    public List<Reserva> findByCliente (Cliente cliente) {
        return repository.findByCliente(cliente);
    }

    public Reserva createReservation(ReservaRequestDTO body, Cliente cliente) {
        Voo voo = vooService.getVooById(body.voo());

        if(voo.getVagas() <= 0 ) {
            throw new RuntimeException("Não há vagas disponíveis para este voo.");
        }

        Reserva reserva = new Reserva();
        reserva.setCliente(cliente);
        reserva.setVoo(voo);
        reserva.setBagagemExtra(body.bagagemExtra());
        reserva.setPreco(body.preco());

        repository.save(reserva);

        voo.setVagas(voo.getVagas()-1);
        vooService.save(voo);
        return reserva;
    }
}
