package edu.iselab.sc.util;

import java.util.List;

import org.uma.jmetal.algorithm.Algorithm;
import org.uma.jmetal.algorithm.multiobjective.nsgaii.NSGAIIBuilder;
import org.uma.jmetal.algorithm.multiobjective.nsgaiii.NSGAIIIBuilder;
import org.uma.jmetal.example.AlgorithmRunner;
import org.uma.jmetal.operator.crossover.impl.IntegerSBXCrossover;
import org.uma.jmetal.operator.mutation.impl.IntegerPolynomialMutation;
import org.uma.jmetal.operator.selection.impl.BinaryTournamentSelection;
import org.uma.jmetal.solution.integersolution.IntegerSolution;

import edu.iselab.sc.Launcher.Params;
import edu.iselab.sc.constant.AlgorithmName;
import edu.iselab.sc.instance.Instance;
import edu.iselab.sc.problem.ContainerSchedulingProblem;
import edu.iselab.sc.util.ParetoFrontUtils.ParetoFront;

public class AlgorithmUtils {

    public static double crossoserProbability = 0.9;
    
    public static double mutationProbability = 0.005;
    
    public static Algorithm<List<IntegerSolution>> getAlgorithm(ContainerSchedulingProblem problem, Params params) {

        if (params.getAlgorithmName() == AlgorithmName.NSGA_II) {
            return getNSGAII(problem, params);
        }

        if (params.getAlgorithmName() == AlgorithmName.NSGA_III) {
            return getNSGAIII(problem, params);
        }

        return null;
    }
    
    public static Algorithm<List<IntegerSolution>> getNSGAII(ContainerSchedulingProblem problem, Params params) {

        return new NSGAIIBuilder<IntegerSolution>(
            problem, 
            new IntegerSBXCrossover(crossoserProbability, 20.0), 
            new IntegerPolynomialMutation(mutationProbability, 20.0), 
            params.getPopulationSize()
        )
        .setSelectionOperator(new BinaryTournamentSelection<IntegerSolution>())
        .setMaxEvaluations(params.getPopulationSize() * params.getIterations())
        .build() ;
    }
    
    public static Algorithm<List<IntegerSolution>> getNSGAIII(ContainerSchedulingProblem problem, Params params) {
        
        return new NSGAIIIBuilder<>(problem)
            .setCrossoverOperator(new IntegerSBXCrossover(crossoserProbability, 20.0))
            .setMutationOperator(new IntegerPolynomialMutation(mutationProbability, 20.0))
            .setSelectionOperator(new BinaryTournamentSelection<IntegerSolution>())
            .setMaxIterations(params.getIterations())
            .setNumberOfDivisions(5)
            .build();
    }
    
    public static ParetoFront run(Instance instance, Params params) {
        
        ContainerSchedulingProblem problem = new ContainerSchedulingProblem(instance);
        
        Algorithm<List<IntegerSolution>> algorithm = AlgorithmUtils.getAlgorithm(problem, params);
        
        AlgorithmRunner algorithmRunner = new AlgorithmRunner.Executor(algorithm).execute();

        long executionTime = algorithmRunner.getComputingTime();
        
        return new ParetoFront(instance, params, executionTime, algorithm.getResult());
    }
}
