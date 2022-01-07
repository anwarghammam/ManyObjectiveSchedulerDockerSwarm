package edu.iselab.sc.problem.objective;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

import edu.iselab.sc.instance.Instance;

/**
 * Minimize the Number of Nodes
 * 
 * @author Thiago Ferreira
 * @since 2021-04-14
 */
public class NumberOfNodes extends Objective {

    @Override
    public String getName() {
        return "Number of Nodes";
    }

    @Override
    public double evaluate(Instance instance, List<Integer> variables) {

        Set<Integer> distincts = new HashSet<>(variables);
        
        distincts.remove(-1);

        return (double) distincts.size() / (double) instance.getNodes().size();
    }
}
