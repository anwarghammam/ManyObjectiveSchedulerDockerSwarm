package edu.iselab.sc.util;

import java.util.List;

import org.uma.jmetal.util.pseudorandom.JMetalRandom;

public class RandomUtils {

    private static final JMetalRandom random = JMetalRandom.getInstance();

    public static int randInt(int lowerBound, int upperBound) {
        return random.nextInt(lowerBound, upperBound);
    }

    public static double randDouble() {
        return random.nextDouble();
    }

    public static <T> T randElement(List<T> list) {

        int index = RandomUtils.randInt(0, list.size() - 1);

        return list.get(index);
    }
}
