package edu.iselab.sc.problem.objective;

import java.util.List;

import edu.iselab.sc.instance.Instance;

public class NodesCohesion extends Objective {

    @Override
    public String getName() {
        return "COH";
    }

    @Override
    public double evaluate(Instance instance, List<Integer> variables) {

        List<int[]> edges = instance.getDependencyEdges();

        double sum = 0.0;

        for (int[] edge : edges) {
            sum += getOH(variables, edge[0], edge[1]);
        }

        return 1.0 - ((double) sum / (double) edges.size());
    }

    protected double getOH(List<Integer> variables, int a, int b) {

        if (variables.get(a) == variables.get(b)) {
            return 1.0;
        }

        return 0.0;
    }
}
