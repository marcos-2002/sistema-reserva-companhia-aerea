package padrao_de_projeto.companhia_aerea.service;

import jakarta.persistence.EntityNotFoundException;
import org.modelmapper.ModelMapper;
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

    @Autowired
    private ModelMapper modelMapper;


    public void deletarVoo(UUID id) {
        if (!repository.existsById(id)) {
            throw new EntityNotFoundException("Voo não encontrado com id: " + id);
        }
        repository.deleteById(id);
    }

    public List<Voo> findAll() {
        return repository.findAll();
    }

    public void save(Voo voo){
        repository.save(voo);
    }

    public Voo createVoo(VooRequestDTO data) {
        Voo newVoo = new Voo();

        newVoo.setSaida(data.saida());
        newVoo.setChegada(data.chegada());

        newVoo.setVagasNormal(data.vagasExecutiva());
        newVoo.setVagasExecutiva(data.vagasExecutiva());

        newVoo.setPreçoExecutiva(data.preçoExecutiva());
        newVoo.setPreçoNormal(data.preçoExecutiva());

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

    public Voo atualizarVoo(UUID id, VooRequestDTO vooRequestDTO) {
        Voo vooExistente = repository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Reserva não encontrada com id: " + id));

        if (vooRequestDTO.origem() != null) {
            vooExistente.setOrigem(vooRequestDTO.origem());
        }
        if (vooRequestDTO.destino() != null) {
            vooExistente.setDestino(vooRequestDTO.destino());
        }
        if (vooRequestDTO.saida() != null) {
            vooExistente.setSaida(vooRequestDTO.saida());
        }
        if (vooRequestDTO.chegada() != null) {
            vooExistente.setChegada(vooRequestDTO.chegada());
        }
        if (vooRequestDTO.vagasExecutiva() != null) {
            vooExistente.setVagasExecutiva(vooRequestDTO.vagasExecutiva());
        }
        if (vooRequestDTO.vagasNormal() != null) {
            vooExistente.setVagasNormal(vooRequestDTO.vagasNormal());
        }
        if (vooRequestDTO.preçoNormal() != null) {
            vooExistente.setPreçoNormal(vooRequestDTO.preçoNormal());
        }
        if (vooRequestDTO.preçoExecutiva() != null) {
            vooExistente.setPreçoExecutiva(vooRequestDTO.preçoExecutiva());
        }

        // Salva a reserva atualizada no banco de dados
        return repository.save(vooExistente);
    }
}
