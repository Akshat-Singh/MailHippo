import smtplib, ssl
from email.message import EmailMessage
import getpass
import json

def email_sender(emails, subject, body, user_email, password):
    # smtp setup
    port = 465  # For SSL
    smtp_server = "smtp.gmail.com"

    # sender_email = input("Enter email: ")
    # password = getpass.getpass("Enter password: ")

    sender_email = user_email
    password = password

    # Create a secure SSL context
    context = ssl.create_default_context()

    for email in emails:

        message = EmailMessage()
        message['Subject'] = subject
        message['From'] = sender_email
        message['To'] = email

        message.set_content(body)

        with smtplib.SMTP_SSL(smtp_server, port, context=context) as server:
            server.login(sender_email, password)
            server.send_message(message)
            print(f"Email sent to {email}")