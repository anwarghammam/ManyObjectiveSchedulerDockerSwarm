package edu.iselab.sc.util;

import static com.google.common.base.Preconditions.checkArgument;
import static com.google.common.base.Preconditions.checkNotNull;

import java.nio.file.Path;
import java.util.List;

import org.uma.jmetal.solution.integersolution.IntegerSolution;
import org.uma.jmetal.util.fileoutput.SolutionListOutput;

import edu.iselab.sc.Launcher.Params;
import edu.iselab.sc.instance.Instance;
import lombok.AllArgsConstructor;
import lombok.Data;

public class ParetoFrontUtils {
    
    @Data
    @AllArgsConstructor
    public static class ParetoFront {
        
        protected Instance instance;

        protected Params params;
        
        protected long executionTime;

        protected List<IntegerSolution> solutions;        
    }
    
    public static String getKey(Params params) {
        return String.format("%s-%s-%s", params.getAlgorithmName(), params.getPopulationSize(), params.getIterations());
    }
    
    public static Path getFile(Path outputFolder, ParetoFront paretoFront, String folder, String extension) {

        String key = getKey(paretoFront.getParams());

        Path file = outputFolder.resolve(folder).resolve(paretoFront.getInstance().getName()).resolve(key + extension);

        FileUtils.createIfNotExists(file.getParent());

        return file;
    }
    
    public static void writeTIME(Path outputFolder, ParetoFront paretoFront) {
        
        checkArgument(FileUtils.isValid(outputFolder), "outputFolder should be valid");
        checkNotNull(paretoFront, "paretoFront should be valid");
        
        Path file = getFile(outputFolder, paretoFront, "times", "-time.txt");
                
        StringBuilder builder = new StringBuilder();
        
        builder.append(paretoFront.getExecutionTime());
        
        FileUtils.write(file, builder.toString());
    }

    public static void writeFUN(Path outputFolder, ParetoFront paretoFront) {
        
        checkArgument(FileUtils.isValid(outputFolder), "outputFolder should be valid");
        checkNotNull(paretoFront, "paretoFront should be valid");
        
        Path file = getFile(outputFolder, paretoFront, "objectives", "-fun.txt");

        new SolutionListOutput(paretoFront.getSolutions()).printObjectivesToFile(file.toString(), " ");
    }
    
    public static void writeVAR(Path outputFolder, ParetoFront paretoFront) {
        
        checkArgument(FileUtils.isValid(outputFolder), "outputFolder should be valid");
        checkNotNull(paretoFront, "paretoFront should be valid");
        
        Path file = getFile(outputFolder, paretoFront, "variables", "-var.txt");
        
        new SolutionListOutput(paretoFront.getSolutions()).printVariablesToFile(file.toString(), " ");
    }
    
    public static void writeCON(Path outputFolder, ParetoFront paretoFront) {
        
        checkArgument(FileUtils.isValid(outputFolder), "outputFolder should be valid");
        checkNotNull(paretoFront, "paretoFront should be valid");
        
        Path file = getFile(outputFolder, paretoFront, "constraints", "-con.txt");
        
        StringBuilder builder = new StringBuilder();
        
        for (int i = 0; i < paretoFront.getSolutions().size(); i++) {

            IntegerSolution solution = paretoFront.getSolutions().get(i);

            for (int j = 0; j < solution.getNumberOfConstraints(); j++) {

                builder.append(solution.getConstraint(j));

                if (j + 1 != solution.getNumberOfConstraints()) {
                    builder.append(" ");
                }
            }

            if (i + 1 != paretoFront.getSolutions().size()) {
                builder.append("\n");
            }
        }
        
        FileUtils.write(file, builder.toString());
    }
    
    public static void write(Path outputFolder, ParetoFront paretoFront) {

        ParetoFrontUtils.writeFUN(outputFolder, paretoFront);
        ParetoFrontUtils.writeVAR(outputFolder, paretoFront);
        ParetoFrontUtils.writeCON(outputFolder, paretoFront);
        ParetoFrontUtils.writeTIME(outputFolder, paretoFront);
    }
}
