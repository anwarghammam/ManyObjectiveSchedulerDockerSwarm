package edu.iselab.sc.util;

import static com.google.common.base.Preconditions.checkNotNull;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

public class FileUtils {
    
    /**
     * Private Constructor will prevent the instantiation of this class directly
     */
    private FileUtils() {
        throw new UnsupportedOperationException("This class cannot be instantiated");
    }
    
    /**
     * Write a string content to a file. If the parent folder does not exist, it
     * will create it. Also, if the file already exists, it will overwrite
     * 
     * @param file    should not be null
     * @param content should not be null
     * 
     * @throws IllegalArgumentException if an I/O error occurs 
     */
    public static void write(Path file, String content) {

        checkNotNull(file, "file should not be null");
        checkNotNull(content, "content should not be null");

        createIfNotExists(file.getParent());
        
        try {
            Files.write(file, content.getBytes());
        } catch (IOException ex) {
            throw new IllegalArgumentException(ex);
        }
    }

    /**
     * Create a folder on your hard drive if it does not exist
     * 
     * @param folder should not be null
     * @return the folder created
     * @throws IllegalArgumentException if an I/O error occurs 
     */
    public static Path createIfNotExists(Path folder) {

        checkNotNull(folder, "folder should not be null");

        if (!Files.exists(folder)) {

            try {
                Files.createDirectories(folder);
            } catch (IOException ex) {
                throw new IllegalArgumentException(ex);
            }
        }
        
        return folder;
    }
    
    public static Path getCurrentDirectory() {
        return Paths.get(System.getProperty("user.dir"));
    }
    
    /**
     * @param path to be validated
     * @return True if path is not null and exists, otherwise, false
     */
    public static boolean isValid(Path path) {

        if (path != null && Files.exists(path)) {
            return true;
        }

        return false;
    }
}
