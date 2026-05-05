<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $name = htmlspecialchars($_POST["name"]);
    $email = htmlspecialchars($_POST["email"]);
    $phone = htmlspecialchars($_POST["phone"]);
    $message = htmlspecialchars($_POST["message"]);

    $to = "anastasia.st.ly@gmail.com";  
    $subject = "Ново запитване от сайта";

    $body = "Име: $name\n";
    $body .= "Имейл: $email\n";
    $body .= "Телефон: $phone\n\n";
    $body .= "Съобщение:\n$message";

    $headers = "From: $email";

    mail($to, $subject, $body, $headers);

    header("Location: thanks.html");
    exit();
}
?>
