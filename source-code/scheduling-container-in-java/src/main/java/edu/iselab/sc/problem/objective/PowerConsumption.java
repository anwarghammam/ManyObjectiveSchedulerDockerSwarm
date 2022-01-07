package edu.iselab.sc.problem.objective;

import java.util.List;

import edu.iselab.sc.instance.Container;
import edu.iselab.sc.instance.Instance;

/**
 * Minimize the Power Consumption
 * 
 * @author Thiago Ferreira
 * @since 2021-04-14
 */
public class PowerConsumption extends Objective {

    @Override
    public String getName() {
        return "Power Consumption";
    }

    @Override
    public double evaluate(Instance instance, List<Integer> variables) {

        long powerConsumption = 0L;

        for (int i = 0; i < variables.size(); i++) {

            int nodeId = variables.get(i);

            if (nodeId != -1) {
                powerConsumption += instance.findContainerById(i).getPowerConsumption();
            }
        }

        return (double) powerConsumption / (double) getTotalPowerConsumption(instance);
    }

    protected long getTotalPowerConsumption(Instance instance) {

        long total = 0L;

        for (Container container : instance.getContainers()) {
            total += container.getPowerConsumption();
        }

        return total;
    }
}
