package edu.iselab.sc.problem.constraint;

import java.util.List;

import edu.iselab.sc.instance.Instance;
import edu.iselab.sc.instance.Node;

public class SatisfyMaxPowerConsumption extends Constraint {

    @Override
    public String getName() {
        return "Satisfy Max Power Consumption";
    }

    @Override
    public double evaluate(Instance instance, List<Integer> variables) {

        long[] totalPowerConsumption = new long[instance.getNodes().size()];

        for (int i = 0; i < variables.size(); i++) {

            int nodeId = variables.get(i);

            if (nodeId != -1) {
                totalPowerConsumption[nodeId] += instance.findContainerById(i).getPowerConsumption();
            }
        }

        int invalids = 0;

        for (int i = 0; i < totalPowerConsumption.length; i++) {

            Node node = instance.findNodeById(i);

            if (totalPowerConsumption[i] > node.getMaxPowerConsumption()) {
                invalids++;
            }
        }

        return invalids;
    }
}
