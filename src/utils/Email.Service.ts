import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses';

const ses = new SESClient({
    region: "ap-south-1",
    credentials: {
        accessKeyId: process.env.AWS_ACCESS as string,
        secretAccessKey: process.env.AWS_SECRET as string,
    },
});

export const sendEmail = async (to: string, subject: string, text: string) => {
    const params = {
        Destination: {
            ToAddresses: [to],
        },
        Message: {
            Body: {
                Html: {
                    Data: text,
                },
            },
            Subject: {
                Data: subject,
            },
        },
        Source: process.env.AWS_EMAIL,
    };
    await ses.send(new SendEmailCommand(params));
};