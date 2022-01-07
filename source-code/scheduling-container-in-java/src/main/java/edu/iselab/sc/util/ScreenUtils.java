package edu.iselab.sc.util;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.stream.Collectors;

import edu.iselab.sc.instance.Instance;
import edu.iselab.sc.instance.Node;

public class ScreenUtils {

    public static void print(Instance instance, List<Integer> variables) {
        
        Map<Integer, List<String>> columns = new HashMap<>();

        for (Node node : instance.getNodes()) {
            columns.putIfAbsent(node.getId(), new ArrayList<>());
        }

        for (int i = 0; i < variables.size(); i++) {
            columns.get(variables.get(i)).add(instance.findContainerById(i).getName());
        }
        
        
        Map<Integer, Integer> sizes = new HashMap<>();
        
        int maxNumberOfRows = 0;
        
        for (Entry<Integer, List<String>> entry : columns.entrySet()) {

            int size = 0;

            maxNumberOfRows = Integer.max(maxNumberOfRows, entry.getValue().size());

            size = Math.max(size, instance.findNodeById(entry.getKey()).getName().length());
            
            for (String s : entry.getValue()) {
                size = Math.max(size, s.length());
            }

            sizes.put(entry.getKey(), size);
        }
        
        
        List<List<String>> table = new ArrayList<>();

        table.add(instance.getNodes().stream().map(e -> e.getName()).collect(Collectors.toList()));

        for (int i = 0; i < maxNumberOfRows; i++) {

            List<String> row = new ArrayList<>();

            for (int j = 0; j < instance.getNodes().size(); j++) {

                Node node = instance.getNodes().get(j);

                List<String> containers = columns.get(node.getId());

                if (containers.isEmpty()) {
                    row.add("");
                } else {
                    row.add(containers.remove(0));
                }
            }

            table.add(row);
        }
        
        List<String> formats = new ArrayList<>();
        
        for (Entry<Integer, Integer> entry : sizes.entrySet()) {
            formats.add(String.format("|%%%ds", entry.getValue()+1));
        }
        
        int width = sizes.values().stream().mapToInt(Integer::intValue).sum()+(instance.getNodes().size()*2)+1;
        
        for (int i = 0; i < table.size(); i++) {

            String format = String.join("", formats);
            
            List<String> row = table.get(i);

            if (i == 0) {
                System.out.println("-".repeat(width));
                System.out.format(format+"|%n", row.toArray());
                System.out.println("-".repeat(width));
            } else {
//                System.out.format("%20s|%20s|%20s|%n", row.toArray());
                System.out.format(format+"|%n", row.toArray());
            }
        }
        
        System.out.println("-".repeat(width));
    }
}
