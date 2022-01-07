package edu.iselab.sc.problem.constraint;

import java.util.List;

import edu.iselab.sc.instance.Instance;

public abstract class Constraint {

    public abstract String getName();

    public abstract double evaluate(Instance instance, List<Integer> variables);
}
