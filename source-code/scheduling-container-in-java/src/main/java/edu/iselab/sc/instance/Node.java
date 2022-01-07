package edu.iselab.sc.instance;

import com.fasterxml.jackson.annotation.JsonAlias;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Node {

    protected Integer id;

    protected String name;

    protected boolean activated;
    
    @JsonAlias("max_power_consumption")
    protected Long maxPowerConsumption = Long.MAX_VALUE;
}
