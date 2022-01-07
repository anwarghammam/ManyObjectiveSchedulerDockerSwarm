package edu.iselab.sc.util;

import static com.google.common.base.Preconditions.checkArgument;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.databind.ObjectMapper;

import edu.iselab.sc.instance.Container;
import edu.iselab.sc.instance.Instance;
import edu.iselab.sc.instance.Node;

public class InstanceUtils {

    public static Instance read(Path file) {

        checkArgument(FileUtils.isValid(file), "file should be valid");
        
        try {

            String content = Files.readString(file);

            ObjectMapper objectMapper = new ObjectMapper();

            return objectMapper.readValue(content, Instance.class);

        } catch (IOException ex) {
            throw new IllegalArgumentException(ex);
        }
    }
    
    public static String create(int numberOfNodes, int numberOfContainers) {

        checkArgument(numberOfNodes >= 0, "numberOfNodes >= 0");
        checkArgument(numberOfContainers >= 0, "numberOfContainers >= 0");
        
        Instance instance = new Instance();
        
        instance.setName("instance-3");

        for (int i = 0; i < numberOfNodes; i++) {
            instance.getNodes().add(new Node(i, "node_" + i, true, 1000L));
        }

        for (int i = 0; i < numberOfContainers; i++) {

            Container container = new Container(i, "container_" + i);

            container.setDependencies(getDependency(numberOfContainers, i)); 
            container.setPlacements(getPlacements(numberOfNodes)); 
            
            instance.getContainers().add(container);
            instance.getCurrentState().add(RandomUtils.randInt(0, numberOfNodes - 1));
        }

        ObjectMapper objectMapper = new ObjectMapper();

        try {
            return objectMapper.writeValueAsString(instance);
        } catch (IOException ex) {
            throw new IllegalArgumentException(ex);
        }
    }

    public static List<Integer> getDependency(int numberOfContainers, int ignore) {

        checkArgument(numberOfContainers >= 0, "numberOfContainers >= 0");
        checkArgument(ignore >= 0, "ignore >= 0");
        
        List<Integer> dependencies = new ArrayList<>();

        for (int i = 0; i < numberOfContainers; i++) {

            if (i != ignore && RandomUtils.randDouble() >= 0.995) {
                dependencies.add(i);
            }
        }

        return dependencies;
    }
    
    public static List<Integer> getPlacements(int numberOfNodes) {
        
        checkArgument(numberOfNodes >= 0, "numberOfNodes >= 0");
        
        List<Integer> placements = new ArrayList<>();

        for (int i = 0; i < numberOfNodes; i++) {

            if (RandomUtils.randDouble() >= 0.85) {
                placements.add(i);
            }
        }

        return placements;
    }
}
