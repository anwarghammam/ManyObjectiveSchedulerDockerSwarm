package edu.iselab.sc.problem.objective;

import java.util.List;

import org.apache.commons.math3.stat.descriptive.DescriptiveStatistics;

import edu.iselab.sc.instance.Instance;

public class AverageNumberOfContainersPerNode extends Objective {

    @Override
    public String getName() {
        return "FRQ";
    }

    @Override
    public double evaluate(Instance instance, List<Integer> variables) {

        double[] values = getContainersPerNode(instance, variables);

        DescriptiveStatistics stats = new DescriptiveStatistics(values);

        return Math.sqrt(stats.getPopulationVariance());
    }

    protected double[] getContainersPerNode(Instance instance, List<Integer> variables) {

        double[] values = new double[instance.getNodes().size()];

        for (int i = 0; i < variables.size(); i++) {

            if (variables.get(i) != -1) {
                values[variables.get(i)]++;
            }
        }

        for (int i = 0; i < values.length; i++) {
            values[i] = values[i] / instance.getContainers().size();
        }

        return values;
    }
}
