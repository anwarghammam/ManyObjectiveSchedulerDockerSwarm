package edu.iselab.sc.problem.objective;

import java.util.List;

import edu.iselab.sc.instance.Instance;

public class NodesCoupling extends Objective {

    @Override
    public String getName() {
        return "COP";
    }

    @Override
    public double evaluate(Instance instance, List<Integer> variables) {

        List<int[]> edges = instance.getDependencyEdges();

        double sum = 0.0;

        for (int[] edge : edges) {
            sum += getOP(variables, edge[0], edge[1]);
        }

        return ((double) sum / (double) edges.size());
    }

    protected double getOP(List<Integer> variables, int a, int b) {

        if (variables.get(a) != variables.get(b)) {
            return 1.0;
        }

        return 0.0;
    }
}
