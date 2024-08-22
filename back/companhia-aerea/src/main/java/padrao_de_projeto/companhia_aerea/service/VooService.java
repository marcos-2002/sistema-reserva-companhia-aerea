package padrao_de_projeto.companhia_aerea.service;

import padrao_de_projeto.companhia_aerea.domain.Voo.Voo;
import padrao_de_projeto.companhia_aerea.domain.Voo.VooRequestDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import padrao_de_projeto.companhia_aerea.repositories.VooRepository;

import java.util.Date;
import java.util.List;
import java.util.UUID;

@Service
public class VooService {

    @Autowired
    private VooRepository repository;

    public List<Voo> findAll() {
        return repository.findAll();
    }

    public void save(Voo voo){
        repository.save(voo);
    }

    public Voo createVoo(VooRequestDTO data) {
        Voo newVoo = new Voo();

        newVoo.setSaida(new Date(data.saida()));
        newVoo.setChegada(new Date(data.chegada()));

        newVoo.setVagas(data.vagas());
        newVoo.setOrigem(data.origem());
        newVoo.setDestino(data.destino());

        repository.save(newVoo);
        return newVoo;

    }

    public List<Voo> searchFlights(String origin, String destination) {
        return repository.findByOrigemAndDestino(origin, destination);
    }

    public Voo getVooById(UUID id) {
        return repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Voo não encontrado com o id: " + id));
    }
}
