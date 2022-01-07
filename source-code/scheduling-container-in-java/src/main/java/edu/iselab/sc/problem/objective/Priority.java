package edu.iselab.sc.problem.objective;

import java.util.List;

import edu.iselab.sc.instance.Instance;

/**
 * Maximize the Priority
 * 
 * @author Thiago Ferreira
 * @since 2021-04-14
 */
public class Priority extends Objective {

    @Override
    public String getName() {
        return "Priority";
    }

    @Override
    public double evaluate(Instance instance, List<Integer> variables) {

        int total = 0;

        for (int i = 0; i < variables.size(); i++) {

            int nodeId = variables.get(i);

            if (nodeId != -1) {
                total += instance.findContainerById(i).getPriority();
            }
        }

        return (double) total;
    }
}
