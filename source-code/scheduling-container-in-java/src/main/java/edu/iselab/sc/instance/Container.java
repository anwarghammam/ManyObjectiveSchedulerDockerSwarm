package edu.iselab.sc.instance;

import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonAlias;
import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class Container {

    protected Integer id;

    protected String name;
    
    protected Long priority;

    protected List<Integer> dependencies = new ArrayList<>();

    protected List<Integer> placements = new ArrayList<>();
    
    @JsonAlias("power_consumption")
    protected Long powerConsumption;
    
    public Container(Integer id, String name) {
        this.id = id;
        this.name = name;
    }

    public boolean isValidPlacement(int nodeId) {

        if (placements.isEmpty()) {
            return true;
        }

        return placements.contains(nodeId);
    }
    
    @JsonIgnore
    public List<int[]> getDependencyEdges() {

        List<int[]> edges = new ArrayList<>();

        for (Integer i : dependencies) {
            edges.add(new int[] { id, i });
        }

        return edges;
    }
}
