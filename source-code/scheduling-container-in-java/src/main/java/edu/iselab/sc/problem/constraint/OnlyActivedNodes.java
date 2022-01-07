package edu.iselab.sc.problem.constraint;

import java.util.List;

import edu.iselab.sc.instance.Instance;

public class OnlyActivedNodes extends Constraint {

    @Override
    public String getName() {
        return "Only Actived Nodes";
    }

    @Override
    public double evaluate(Instance instance, List<Integer> variables) {
        
        List<Integer> activedNodes = instance.getActivedNodes();
        
        int invalids = 0;

        for (int i = 0; i < variables.size(); i++) {

            if (!activedNodes.contains(variables.get(i))) {
                invalids++;
            }
        }

        return invalids;
    }
}
