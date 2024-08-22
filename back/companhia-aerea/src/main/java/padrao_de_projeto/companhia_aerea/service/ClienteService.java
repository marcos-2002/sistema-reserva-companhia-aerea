package padrao_de_projeto.companhia_aerea.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import padrao_de_projeto.companhia_aerea.domain.Cliente.Cliente;
import padrao_de_projeto.companhia_aerea.repositories.ClienteRespository;

@Service
public class ClienteService {

    @Autowired
    ClienteRespository clienteRespository;


}
