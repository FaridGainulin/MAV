
<?php
$path = dirname(__FILE__);
require $path . '/PHPMailer/src/Exception.php';
require $path . '/PHPMailer/src/PHPMailer.php';
require $path . '/PHPMailer/src/SMTP.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

function mailer($sendto, $subject, $htmlBody, $headers = false)
{
    try {
        $phpmailer = new PHPMailer();

        if (SMTP) {
            $phpmailer->isSMTP();
            $phpmailer->Host = 'mail.peb-franchise.ru'; // ex: smtp.mailtrap.io
            $phpmailer->SMTPAuth = true; // change to false if not needed
            $phpmailer->Port = 25; // port
            $phpmailer->Username = 'info@peb-franchise.ru'; // only n case auth needed, otherwise comment this line
            $phpmailer->Password = 'eM2xA7aF0k'; // only n case auth needed, otherwise comment this line | yW2pO5tH2q
            $phpmailer->SMTPAutoTLS = false;
            $phpmailer->SMTPSecure = false;
        }

        $phpmailer->setFrom(SND_FROM, SND_NAME);

        $addresses = explode(',', $sendto);

        foreach ($addresses as $address) {
            $phpmailer->addAddress(trim($address));
        }

        $phpmailer->addReplyTo(SND_FROM, SND_NAME);

        $phpmailer->isHTML(true);
        $phpmailer->Subject = $subject;
        $phpmailer->Body = $htmlBody;
        $phpmailer->CharSet = 'UTF-8';
        $phpmailer->AltBody = str_replace(
            ['<br>', '<br/>', '<BR>', '<BR/>'],
            "\r\n",
            strip_tags($htmlBody, '<br>')
        );
        $phpmailer->send();
        if ($_GET['dev']) {
            var_dump($phpmailer->ErrorInfo);
        }
        return true;
    } catch (Exception $e) {
        if (isset($_GET['dev'])) {
            echo $e->getMessage();
        }

        return false;
    }
}

function fileContentsToVar($file, $data)
{
    extract($data);
    ob_start();
    require $file;
    return ob_get_clean();
}

