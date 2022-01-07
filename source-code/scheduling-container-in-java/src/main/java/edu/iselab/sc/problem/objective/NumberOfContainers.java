package edu.iselab.sc.problem.objective;

import java.util.List;

import edu.iselab.sc.instance.Instance;

/**
 * Maximize the Number of Containers
 * 
 * @author Thiago Ferreira
 * @since 2021-04-14
 */
public class NumberOfContainers extends Objective {

    @Override
    public String getName() {
        return "Number of Containers";
    }

    @Override
    public double evaluate(Instance instance, List<Integer> variables) {

        int total = 0;

        for (Integer i : variables) {

            if (i != -1) {
                total++;
            }
        }

        return -1.0 * (double) total / (double) variables.size();
    }
}
