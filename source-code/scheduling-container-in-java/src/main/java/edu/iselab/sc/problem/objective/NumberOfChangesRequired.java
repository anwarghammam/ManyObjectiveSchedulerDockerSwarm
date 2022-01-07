package edu.iselab.sc.problem.objective;

import java.util.List;

import edu.iselab.sc.instance.Instance;

public class NumberOfChangesRequired extends Objective {

    @Override
    public String getName() {
        return "CHG";
    }

    @Override
    public double evaluate(Instance instance, List<Integer> variables) {

        List<Integer> currentState = instance.getCurrentState();

        return (double) getHammingDistance(variables, currentState) / (double) currentState.size();
    }

    protected int getHammingDistance(List<Integer> left, List<Integer> right) {

        if (right.size() == 0) {
            return 0;
        }

        if (left.size() != right.size()) {
            throw new IllegalArgumentException("it must have the same length");
        }

        int count = 0;

        for (int i = 0; i < left.size(); i++) {

            if (left.get(i) != right.get(i)) {
                count++;
            }
        }

        return count;
    }
}
