package edu.iselab.sc.util;

import edu.iselab.sc.instance.Container;
import edu.iselab.sc.instance.Instance;
import edu.iselab.sc.instance.Node;

public class GraphvizUtils {

    public static String fromDependencies(Instance instance) {

        StringBuilder builder = new StringBuilder();
        
        builder.append("digraph G {").append("\n");

        for (Container container : instance.getContainers()) {

            for (Integer targetId : container.getDependencies()) {

                Container target = instance.findContainerById(targetId);

                builder
                    .append("\t\"")
                    .append(container.getName())
                    .append("\" -> \"")
                    .append(target.getName())
                    .append("\"\n");
            }
        }
        
        builder.append("}");

        return builder.toString();
    }
    
    public static String fromPlacements(Instance instance) {

        StringBuilder builder = new StringBuilder();
        
        builder.append("digraph G {").append("\n");

        for (Container container : instance.getContainers()) {

            for (Integer targetId : container.getPlacements()) {

                Node target = instance.findNodeById(targetId);

                builder
                    .append("\t\"")
                    .append(container.getName())
                    .append("\" -> \"")
                    .append(target.getName())
                    .append("\"\n");
            }
        }
        
        builder.append("}");

        return builder.toString();
    }
}
