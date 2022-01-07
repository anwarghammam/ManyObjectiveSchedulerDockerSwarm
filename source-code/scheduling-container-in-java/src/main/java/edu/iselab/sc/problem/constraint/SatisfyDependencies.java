package edu.iselab.sc.problem.constraint;

import java.util.ArrayList;
import java.util.List;

import edu.iselab.sc.instance.Instance;

public class SatisfyDependencies  extends Constraint {

    @Override
    public String getName() {
        return "Only Valid Dependencies";
    }

    @Override
    public double evaluate(Instance instance, List<Integer> variables) {
        
        List<int[]> edges = instance.getDependencyEdges();
        
        int invalids = 0;

        for (int i = 0; i < variables.size(); i++) {

            if (variables.get(i) == -1) {

                List<Integer> dependents = getDependents(edges, i);

                for (Integer dependent : dependents) {

                    if (variables.get(dependent) != -1) {
                        invalids++;
                    }
                }
            }
        }

        return invalids;
    }
    
    protected List<Integer> getDependents(List<int[]> edges, int target) {

        List<Integer> containers = new ArrayList<>();

        for (int[] edge : edges) {

            if (edge[1] == target) {
                containers.add(edge[0]);
            }
        }

        return containers;
    }
}
