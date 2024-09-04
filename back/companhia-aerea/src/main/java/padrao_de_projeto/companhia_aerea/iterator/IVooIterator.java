package padrao_de_projeto.companhia_aerea.iterator;
import padrao_de_projeto.companhia_aerea.domain.Voo.Voo;

public interface IVooIterator {
    boolean done();
    Voo next();
}
