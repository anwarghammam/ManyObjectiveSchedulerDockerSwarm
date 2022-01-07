package edu.iselab.sc.problem.constraint;

import java.util.List;

import edu.iselab.sc.instance.Instance;

public class OnlyValidPlacements extends Constraint {

    @Override
    public String getName() {
        return "Only Valid Placements";
    }

    @Override
    public double evaluate(Instance instance, List<Integer> variables) {
        
        int invalids = 0;

        for (int i = 0; i < variables.size(); i++) {

            if (!instance.isValidPlacement(i, variables.get(i))) {
                invalids++;
            }
        }

        return invalids;
    }
}
