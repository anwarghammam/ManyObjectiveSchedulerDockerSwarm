package edu.iselab.sc;

import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.concurrent.Callable;

import edu.iselab.sc.constant.AlgorithmName;
import edu.iselab.sc.instance.Instance;
import edu.iselab.sc.util.AlgorithmUtils;
import edu.iselab.sc.util.FileUtils;
import edu.iselab.sc.util.InstanceUtils;
import edu.iselab.sc.util.ParetoFrontUtils;
import edu.iselab.sc.util.ParetoFrontUtils.ParetoFront;
import lombok.Data;
import picocli.CommandLine;
import picocli.CommandLine.ArgGroup;
import picocli.CommandLine.Command;
import picocli.CommandLine.Option;

@Command(
    name = "launcher", 
    footer = "Copyright(c) 2021 ISELab Dearborn"
)
public class Launcher implements Callable<Integer> {
    
    @Option(names = { "-i", "--input" }, description = "the input file")
    protected Path input = Paths.get("src/main/resources/instances/instance-01.json");
    
    @Option(names = { "-o", "--output" }, description = "the output folder")
    protected Path outputFolder = FileUtils.getCurrentDirectory().resolve("output");
    
    @ArgGroup(exclusive = false, multiplicity = "0..1")
    protected Params params = new Params();

    @Data
    public static class Params {

        @Option(names = { "-a", "--algorithm" }, description = "algorithm name")
        public AlgorithmName algorithmName = AlgorithmName.NSGA_III;

        @Option(names = { "-p", "--populationSize" }, description = "population size")
        public int populationSize = 100;

        @Option(names = { "-it", "--iterations" }, description = "max iterations")
        public int iterations = 100;
    }

    public static void main(String[] args) {

        int exitCode = new CommandLine( new Launcher())
            .setCaseInsensitiveEnumValuesAllowed(true)
            .execute(args);
           
       System.exit(exitCode);
    }

    @Override
    public Integer call() throws Exception {

        System.out.println("Running");

        FileUtils.createIfNotExists(outputFolder);

        Instance instance = InstanceUtils.read(input);

        ParetoFront paretoFront = AlgorithmUtils.run(instance, params);

        ParetoFrontUtils.write(outputFolder, paretoFront);

        System.out.println("Done");

        return 0;
    }
}
