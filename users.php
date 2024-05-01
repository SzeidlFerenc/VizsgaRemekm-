<?php
$servername = "localhost";
$username = "username";
$password = "password";
$dbname = "myDB";

// Adatbázis kapcsolat létrehozása
$conn = new mysqli($servername, $username, $password, $dbname);

// Ellenőrizzük a kapcsolatot
if ($conn->connect_error) {
    die("Kapcsolódási hiba: " . $conn->connect_error);
}

// Regisztrációs adatok fogadása
$name = $_POST["name"];
$email = $_POST["newEmail"];
$password = password_hash($_POST["newPassword"], PASSWORD_DEFAULT);

// SQL lekérdezés a felhasználó beszúrására az adatbázisba
$sql = "INSERT INTO users (name, email, password) VALUES ('$name', '$email', '$password')";

if ($conn->query($sql) === TRUE) {
    echo json_encode(["success" => true, "message" => "Sikeres regisztráció!"]);
} else {
    echo json_encode(["success" => false, "message" => "Hiba történt a regisztráció során: " . $conn->error]);
}

// Adatbázis kapcsolat lezárása
$conn->close();
?>
