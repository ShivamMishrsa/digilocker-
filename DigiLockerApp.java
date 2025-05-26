import java.io.*;
import java.nio.file.*;
import java.util.*;

public class DigiLockerApp {
    private static Scanner scanner = new Scanner(System.in);
    private static UserDAO userDAO = new UserDAO();
    private static DocumentDAO documentDAO = new DocumentDAO();
    private static User currentUser = null;
    private static final String UPLOAD_DIRECTORY = "uploads/";
    
    public static void main(String[] args) {
        // Create upload directory if it doesn't exist
        createUploadDirectory();
        
        System.out.println("=================================");
        System.out.println("   Welcome to DigiLocker System  ");
        System.out.println("=================================");
        
        while (true) {
            if (currentUser == null) {
                showMainMenu();
            } else {
                showUserMenu();
            }
        }
    }
    
    private static void createUploadDirectory() {
        try {
            Files.createDirectories(Paths.get(UPLOAD_DIRECTORY));
        } catch (IOException e) {
            System.err.println("Error creating upload directory: " + e.getMessage());
        }
    }
    
    private static void showMainMenu() {
        System.out.println("\n--- Main Menu ---");
        System.out.println("1. Register");
        System.out.println("2. Login");
        System.out.println("3. Exit");
        System.out.print("Choose an option: ");
        
        int choice = getIntInput();
        
        switch (choice) {
            case 1:
                registerUser();
                break;
            case 2:
                loginUser();
                break;
            case 3:
                System.out.println("Thank you for using DigiLocker!");
                DatabaseConnection.closeConnection();
                System.exit(0);
                break;
            default:
                System.out.println("Invalid option. Please try again.");
        }
    }
    
    private static void showUserMenu() {
        System.out.println("\n--- DigiLocker Dashboard ---");
        System.out.println("Welcome, " + currentUser.getFullName() + "!");
        System.out.println("1. Upload Document");
        System.out.println("2. View My Documents");
        System.out.println("3. Download Document");
        System.out.println("4. Delete Document");
        System.out.println("5. Search Documents");
        System.out.println("6. Logout");
        System.out.print("Choose an option: ");
        
        int choice = getIntInput();
        
        switch (choice) {
            case 1:
                uploadDocument();
                break;
            case 2:
                viewDocuments();
                break;
            case 3:
                downloadDocument();
                break;
            case 4:
                deleteDocument();
                break;
            case 5:
                searchDocuments();
                break;
            case 6:
                logout();
                break;
            default:
                System.out.println("Invalid option. Please try again.");
        }
    }
    
    private static void registerUser() {
        System.out.println("\n--- User Registration ---");
        
        System.out.print("Enter username: ");
        String username = scanner.nextLine();
        
        if (userDAO.isUsernameExists(username)) {
            System.out.println("Username already exists. Please choose a different username.");
            return;
        }
        
        System.out.print("Enter email: ");
        String email = scanner.nextLine();
        
        if (userDAO.isEmailExists(email)) {
            System.out.println("Email already exists. Please use a different email.");
            return;
        }
        
        System.out.print("Enter password: ");
        String password = scanner.nextLine();
        
        System.out.print("Enter full name: ");
        String fullName = scanner.nextLine();
        
        System.out.print("Enter phone number: ");
        String phone = scanner.nextLine();
        
        User user = new User(username, email, password, fullName, phone);
        
        if (userDAO.registerUser(user)) {
            System.out.println("Registration successful! You can now login.");
        } else {
            System.out.println("Registration failed. Please try again.");
        }
    }
    
    private static void loginUser() {
        System.out.println("\n--- User Login ---");
        
        System.out.print("Enter username: ");
        String username = scanner.nextLine();
        
        System.out.print("Enter password: ");
        String password = scanner.nextLine();
        
        User user = userDAO.loginUser(username, password);
        
        if (user != null) {
            currentUser = user;
            System.out.println("Login successful! Welcome, " + user.getFullName());
        } else {
            System.out.println("Invalid username or password. Please try again.");
        }
    }
    
    private static void uploadDocument() {
        System.out.println("\n--- Upload Document ---");
        
        System.out.print("Enter document name: ");
        String docName = scanner.nextLine();
        
        System.out.print("Enter file path (or 'simulate' for demo): ");
        String filePath = scanner.nextLine();
        
        // Show categories
        Map<String, Integer> categories = documentDAO.getDocumentCategories();
        System.out.println("\nAvailable Categories:");
        int index = 1;
        List<String> categoryNames = new ArrayList<>(categories.keySet());
        for (String categoryName : categoryNames) {
            System.out.println(index + ". " + categoryName);
            index++;
        }
        
        System.out.print("Select category (1-" + categories.size() + "): ");
        int categoryChoice = getIntInput();
        
        if (categoryChoice < 1 || categoryChoice > categories.size()) {
            System.out.println("Invalid category selection.");
            return;
        }
        
        String selectedCategory = categoryNames.get(categoryChoice - 1);
        int categoryId = categories.get(selectedCategory);
        
        // Simulate file operations
        long fileSize;
        String actualFilePath;
        String docType;
        
        if ("simulate".equalsIgnoreCase(filePath)) {
            // Simulate document upload
            fileSize = (long) (Math.random() * 1000000) + 10000; // Random size between 10KB and 1MB
            docType = "pdf"; // Default type for simulation
            actualFilePath = UPLOAD_DIRECTORY + currentUser.getUserId() + "_" + 
                           System.currentTimeMillis() + "_" + docName.replaceAll("\\s+", "_") + ".pdf";
            
            // Create a dummy file for simulation
            try {
                Files.write(Paths.get(actualFilePath), 
                           ("Simulated document: " + docName).getBytes());
                System.out.println("Document simulated successfully!");
            } catch (IOException e) {
                System.err.println("Error creating simulated file: " + e.getMessage());
                return;
            }
        } else {
            // Real file upload
            File file = new File(filePath);
            if (!file.exists()) {
                System.out.println("File not found: " + filePath);
                return;
            }
            
            fileSize = file.length();
            docType = getFileExtension(file.getName());
            actualFilePath = UPLOAD_DIRECTORY + currentUser.getUserId() + "_" + 
                           System.currentTimeMillis() + "_" + file.getName();
            
            try {
                Files.copy(file.toPath(), Paths.get(actualFilePath));
                System.out.println("File uploaded successfully!");
            } catch (IOException e) {
                System.err.println("Error uploading file: " + e.getMessage());
                return;
            }
        }
        
        Document document = new Document(currentUser.getUserId(), docName, docType, 
                                       actualFilePath, fileSize, categoryId);
        
        if (documentDAO.uploadDocument(document)) {
            System.out.println("Document metadata saved to database successfully!");
        } else {
            System.out.println("Failed to save document metadata.");
        }
    }
    
    private static void viewDocuments() {
        System.out.println("\n--- My Documents ---");
        
        List<Document> documents = documentDAO.getUserDocuments(currentUser.getUserId());
        
        if (documents.isEmpty()) {
            System.out.println("No documents found.");
            return;
        }
        
        System.out.printf("%-5s %-30s %-15s %-15s %-20s %-10s%n", 
                         "ID", "Document Name", "Type", "Category", "Upload Date", "Verified");
        System.out.println("=".repeat(100));
        
        for (Document doc : documents) {
            System.out.printf("%-5d %-30s %-15s %-15s %-20s %-10s%n",
                             doc.getDocId(),
                             doc.getDocName().length() > 30 ? 
                                 doc.getDocName().substring(0, 27) + "..." : doc.getDocName(),
                             doc.getDocType(),
                             doc.getCategoryName(),
                             doc.getUploadDate().toString().substring(0, 19),
                             doc.isVerified() ? "Yes" : "No");
        }
    }
    
    private static void downloadDocument() {
        System.out.println("\n--- Download Document ---");
        
        System.out.print("Enter document ID: ");
        int docId = getIntInput();
        
        Document document = documentDAO.getDocumentById(docId, currentUser.getUserId());
        
        if (document == null) {
            System.out.println("Document not found or you don't have permission to access it.");
            return;
        }
        
        System.out.println("Document Details:");
        System.out.println("Name: " + document.getDocName());
        System.out.println("Type: " + document.getDocType());
        System.out.println("Size: " + formatFileSize(document.getFileSize()));
        System.out.println("Category: " + document.getCategoryName());
        System.out.println("Upload Date: " + document.getUploadDate());
        System.out.println("Verified: " + (document.isVerified() ? "Yes" : "No"));
        
        System.out.print("Enter download path (or press Enter for current directory): ");
        String downloadPath = scanner.nextLine();
        
        if (downloadPath.trim().isEmpty()) {
            downloadPath = document.getDocName() + "." + document.getDocType();
        }
        
        try {
            Files.copy(Paths.get(document.getFilePath()), Paths.get(downloadPath), 
                      StandardCopyOption.REPLACE_EXISTING);
            System.out.println("Document downloaded successfully to: " + downloadPath);
        } catch (IOException e) {
            System.err.println("Error downloading document: " + e.getMessage());
        }
    }
    
    private static void deleteDocument() {
        System.out.println("\n--- Delete Document ---");
        
        System.out.print("Enter document ID: ");
        int docId = getIntInput();
        
        Document document = documentDAO.getDocumentById(docId, currentUser.getUserId());
        
        if (document == null) {
            System.out.println("Document not found or you don't have permission to access it.");
            return;
        }
        
        System.out.println("Document to delete: " + document.getDocName());
        System.out.print("Are you sure you want to delete this document? (y/N): ");
        String confirmation = scanner.nextLine();
        
        if ("y".equalsIgnoreCase(confirmation) || "yes".equalsIgnoreCase(confirmation)) {
            if (documentDAO.deleteDocument(docId, currentUser.getUserId())) {
                // Also delete the physical file
                try {
                    Files.deleteIfExists(Paths.get(document.getFilePath()));
                    System.out.println("Document deleted successfully!");
                } catch (IOException e) {
                    System.err.println("Document removed from database but file deletion failed: " + e.getMessage());
                }
            } else {
                System.out.println("Failed to delete document.");
            }
        } else {
            System.out.println("Delete operation cancelled.");
        }
    }
    
    private static void searchDocuments() {
        System.out.println("\n--- Search Documents ---");
        
        System.out.print("Enter search term (document name): ");
        String searchTerm = scanner.nextLine().toLowerCase();
        
        List<Document> allDocuments = documentDAO.getUserDocuments(currentUser.getUserId());
        List<Document> filteredDocuments = new ArrayList<>();
        
        for (Document doc : allDocuments) {
            if (doc.getDocName().toLowerCase().contains(searchTerm)) {
                filteredDocuments.add(doc);
            }
        }
        
        if (filteredDocuments.isEmpty()) {
            System.out.println("No documents found matching: " + searchTerm);
            return;
        }
        
        System.out.println("Search Results:");
        System.out.printf("%-5s %-30s %-15s %-15s %-20s %-10s%n", 
                         "ID", "Document Name", "Type", "Category", "Upload Date", "Verified");
        System.out.println("=".repeat(100));
        
        for (Document doc : filteredDocuments) {
            System.out.printf("%-5d %-30s %-15s %-15s %-20s %-10s%n",
                             doc.getDocId(),
                             doc.getDocName().length() > 30 ? 
                                 doc.getDocName().substring(0, 27) + "..." : doc.getDocName(),
                             doc.getDocType(),
                             doc.getCategoryName(),
                             doc.getUploadDate().toString().substring(0, 19),
                             doc.isVerified() ? "Yes" : "No");
        }
    }
    
    private static void logout() {
        currentUser = null;
        System.out.println("Logged out successfully!");
    }
    
    private static int getIntInput() {
        try {
            return Integer.parseInt(scanner.nextLine());
        } catch (NumberFormatException e) {
            return -1;
        }
    }
    
    private static String getFileExtension(String fileName) {
        int lastDotIndex = fileName.lastIndexOf('.');
        if (lastDotIndex > 0 && lastDotIndex < fileName.length() - 1) {
            return fileName.substring(lastDotIndex + 1).toLowerCase();
        }
        return "unknown";
    }
    
    private static String formatFileSize(long size) {
        if (size < 1024) return size + " B";
        if (size < 1024 * 1024) return String.format("%.1f KB", size / 1024.0);
        if (size < 1024 * 1024 * 1024) return String.format("%.1f MB", size / (1024.0 * 1024));
        return String.format("%.1f GB", size / (1024.0 * 1024 * 1024));
    }
}
