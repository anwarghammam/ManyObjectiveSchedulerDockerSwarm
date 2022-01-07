package edu.iselab.sc.problem;

import static com.google.common.base.Preconditions.checkNotNull;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;

import org.uma.jmetal.problem.integerproblem.impl.AbstractIntegerProblem;
import org.uma.jmetal.solution.integersolution.IntegerSolution;
import org.uma.jmetal.solution.integersolution.impl.DefaultIntegerSolution;

import edu.iselab.sc.instance.Instance;
import edu.iselab.sc.problem.constraint.Constraint;
import edu.iselab.sc.problem.constraint.OnlyActivedNodes;
import edu.iselab.sc.problem.constraint.OnlyValidPlacements;
import edu.iselab.sc.problem.constraint.SatisfyDependencies;
import edu.iselab.sc.problem.constraint.SatisfyMaxPowerConsumption;
import edu.iselab.sc.problem.objective.AverageNumberOfContainersPerNode;
import edu.iselab.sc.problem.objective.NodesCoupling;
import edu.iselab.sc.problem.objective.NumberOfChangesRequired;
import edu.iselab.sc.problem.objective.Objective;
import edu.iselab.sc.problem.objective.PowerConsumption;
import edu.iselab.sc.problem.objective.Priority;
import edu.iselab.sc.util.RandomUtils;
import lombok.Getter;

public class ContainerSchedulingProblem extends AbstractIntegerProblem {

    private static final long serialVersionUID = 3276083658332850716L;
    
    @Getter
    protected Instance instance;
    
    protected List<Objective> objectives;

    protected List<Constraint> constraints;
    
    public ContainerSchedulingProblem(Instance instance) {
        
        checkNotNull(instance, "instance should not be null");

        this.instance = instance;
        this.constraints = Arrays.asList(
            new SatisfyDependencies(),
            new OnlyValidPlacements(),
            new OnlyActivedNodes(),
            new SatisfyMaxPowerConsumption()
        );
        this.objectives = Arrays.asList(
            new PowerConsumption(),
//            new NumberOfNodes(),
            new AverageNumberOfContainersPerNode(),
            new NodesCoupling(),
            new NumberOfChangesRequired(),
            new Priority()
        );

        // JMetal's Settings
        setNumberOfVariables(instance.getContainers().size());
        setNumberOfObjectives(objectives.size());
        setNumberOfConstraints(constraints.size());
        setName(ContainerSchedulingProblem.class.getSimpleName());
        
        List<Integer> lowerBounds = Collections.nCopies(getNumberOfVariables(), -1);
        List<Integer> upperBounds = Collections.nCopies(getNumberOfVariables(), instance.getNodes().size() - 1);

        setVariableBounds(lowerBounds, upperBounds);
    }
    
    public void evaluate(IntegerSolution solution) {
        
        for (int i = 0; i < objectives.size(); i++) {
            solution.setObjective(i, objectives.get(i).evaluate(instance, solution.getVariables()));
        }

        for (int i = 0; i < constraints.size(); i++) {
            solution.setConstraint(i, constraints.get(i).evaluate(instance, solution.getVariables()));
        }

        int totalConstraints = 0;

        for (int i = 0; i < constraints.size(); i++) {
            totalConstraints += solution.getConstraint(i);
        }

        if (totalConstraints != 0) {

            for (int i = 0; i < objectives.size(); i++) {
                solution.setObjective(i, Integer.MAX_VALUE);
            }
        }
    }
    
    @Override
    public IntegerSolution createSolution() {

        IntegerSolution solution = new DefaultIntegerSolution(
            getVariableBounds(), 
            getNumberOfObjectives(),
            getNumberOfConstraints()
        );

        for (int i = 0; i < instance.getContainers().size(); i++) {
            
            List<Integer> validNodes = instance.getValidNodes(i);

            solution.setVariable(i, RandomUtils.randElement(validNodes));
        }

        return solution;
    }
}
