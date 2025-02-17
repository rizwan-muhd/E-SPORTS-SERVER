export const templateText = (resetPasswordUrl: any) => {
    return (
        `<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Password Reset</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #F4F9FF;
        }

        .footer {
            max-width: 600px;
            margin: 20px auto;
            padding: 20px;
            background-color: #F4F9FF;
            border-radius: 3px;
            /* box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); */
        }

        .container {
            max-width: 600px;
            margin: 20px auto;
            padding: 20px;
            background-color: #ffffff;
            border-radius: 3px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        span {
            color: rgba(0, 86, 253, 0.41);
            font-feature-settings: 'clig' off, 'liga' off;
            font-family: Inter;
            font-size: 16px;
            font-style: normal;
            font-weight: 400;
            /* line-height: 18px; */
        }

        h1 {
            color: #333333;
            text-align: start;
        }

        p {
            color: #666666;
            font-size: 16px;
            line-height: 1.6;
            margin-bottom: 20px;
        }

        a {
            display: inline-block;
            background-color: #007bff;
            color: #ffffff;
            text-decoration: none;
            padding: 10px 20px;
            border-radius: 5px;
            transition: background-color 0.3s ease;
        }

        a:hover {
            background-color: #0056b3;
        }
    </style>
</head>

<body>
    <div class="container">
        <img src="assets/logo.svg" />
        <h2>Reset Your E-SPORTS  <br />Password</h2>
        <p>Dear ,</p>
        <p>We noticed you requested a password reset for your Talks & Talks Meet account.</p>
        <p>If you initiated this request, click the link below to create a new password:</p>
        <p> Reset Password Link</p>
        <p>Or</p>
        <a href=${resetPasswordUrl}>Reset Password</a>
    </div>
    <div class="footer">
        <p>
            If you didn't request a password reset, you can safely ignore this email
            Questions? Contact the host at <span>help@talksandtalks.ai</span> </p>
        <p> Reset Password Link</p>
        <p>Questions or concerns? Get in touch with us at <span>rizwankk448@gmail.com</span>  or <span>7034329068</span> </p>
        <p>Never miss a beat! Follow us on Twitter, Facebook and Instagram.</p>
    </div>

</body>

</html>
`)
};