<?php
$servername = "localhost";
$username = "username";
$password = "password";
$dbname = "myDB";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    if(isset($_POST["email"]) && isset($_POST["password"])) {
        // Bejelentkezési adatok fogadása
        $email = $_POST["email"];
        $password = $_POST["password"];

        // SQL lekérdezés a felhasználó keresésére az email alapján
        $sql = "SELECT * FROM users WHERE email='$email'";
        $result = $conn->query($sql);

        if ($result->num_rows > 0) {
            // A felhasználó létezik, ellenőrizzük a jelszót
            $row = $result->fetch_assoc();
            if (password_verify($password, $row["password"])) {
                // Sikeres bejelentkezés
                echo json_encode(["success" => true]);
            } else {
                // Hibás jelszó
                echo json_encode(["success" => false, "message" => "Hibás e-mail cím vagy jelszó!"]);
            }
        } else {
            // A felhasználó nem létezik
            echo json_encode(["success" => false, "message" => "Hibás e-mail cím vagy jelszó!"]);
        }
    } else {
        echo json_encode(["success" => false, "message" => "Hiányzó e-mail cím vagy jelszó!"]);
    }
}

// Adatbázis kapcsolat lezárása
$conn->close();
?>
