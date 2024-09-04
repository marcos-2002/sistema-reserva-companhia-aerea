package padrao_de_projeto.companhia_aerea.iterator;
import padrao_de_projeto.companhia_aerea.domain.Voo.Voo;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;

public class VooPorPrecoIterator implements IVooIterator {
    private List<Voo> voos;
    private int head = 0;

    public VooPorPrecoIterator(List<Voo> voos) {
        this.voos = new ArrayList<>(voos);
        this.voos.sort(Comparator.comparingDouble(Voo::getPreçoNormal)); 
    }

    @Override
    public boolean done() {
        return head == voos.size();
    }

    @Override
    public Voo next() {
        if (!done()) {
            return voos.get(head++);
        }
        return null;
    }
}
