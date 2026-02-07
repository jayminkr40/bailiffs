<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = htmlspecialchars($_POST['name']);
    $email = htmlspecialchars($_POST['email']);
    $phone = htmlspecialchars($_POST['phone']);
    $bailiffType = htmlspecialchars($_POST['bailiffType']);
    $message = htmlspecialchars($_POST['message']);
    
    $to = "anskr1901@gmail.com";
    $subject = "Bailiff Advice UK Contact Form Submission";
    
    $email_body = "New Contact Form Submission:\n\n";
    $email_body .= "Name: $name\n";
    $email_body .= "Email: $email\n";
    $email_body .= "Phone: $phone\n";
    $email_body .= "Bailiff Type: $bailiffType\n";
    $email_body .= "Message:\n$message\n";
    
    $headers = "From: $email\r\n";
    $headers .= "Reply-To: $email\r\n";
    
    if (mail($to, $subject, $email_body, $headers)) {
        echo "success";
    } else {
        echo "error";
    }
}
?>
