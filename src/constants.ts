import {RequestOptionsProp} from "./class/Request.class";


type emailBodyContentType = 'text/html'

interface EmailBody {
    personalizations:
        [{
            to: [{ email: string }]
        }],
    from: { email: string, name: string },
    subject: string,
    content: [{
        "type": emailBodyContentType,
        "value": string
    }],
    reply_to: { email: string, name: string },
}

export interface ConstantsProp {
    minimum_android_version: number,
    minimum_ios_version: number,
    availableBuckets: {
        international: string,
        indians: string
    },
    sendgrid_api_options: RequestOptionsProp,
    serverFailedEmail: EmailBody
}

interface PubProp {
    international: string[],
    indians: string[]
}

export const constants: ConstantsProp = {
    minimum_android_version: 154,
    minimum_ios_version: 153,
    availableBuckets: {
        international: 'international',
        indians: 'indians'
    },
    sendgrid_api_options: {
        "method": "POST",
        "hostname": "api.sendgrid.com",
        "port": null,
        "path": "/v3/mail/send",
        "headers": {
            "authorization": "Bearer " + process.env.SENDGRID_API_KEY,
            "content-type": "application/json"
        },
        timeout: 1000
    },
    serverFailedEmail: {
        personalizations:
            [{
                to: [{email: 'shubhankar@dirtcube.xyz'}]
            }],
        from: {email: 'team@capshot.xyz', name: 'Capshot system'},
        subject: 'Server down test email',
        content: [{
            "type": "text/html",
            "value": 'Server is down \n from Shubhankar Borade'
        }],
        reply_to: {email: 'team@capshot.xyz', name: 'Re : Capshot system'},
    }
}

export const pun: PubProp = {
    indians: [
        'Memes se door rehna mushkil hi nahi, namumkin hai',
        'Tumhara meme kya hain, Basanti?',
        'Dhondu just meme!',
        'Dost ka meme fail ho jaye toh dukh hota hai ... lekin dost first aa jaye toh zyada dukh hota hai',
        'Bhai ne bola meme banane ka, toh banane ka',
        'Remix ka chakkar Babu Bhaiya, Remix ka chakkar',
        'Control Uday Control! Take a break from work and remix the funniest memes on the internet.',
        "Why so serious? Let's put a smile on that face.",
        "Hello, is it memes you're looking for? ",
        "In some cultures, it's rude to not laugh at a meme!",
        "I want you to deal with your problems by making memes!",
        "I'm gonna make a meme they must remix!",
        "Great memers are not born great. They grow great.",
        "Rule number one of Remixing - Fuck what they think!",
        "Daro mat! Sirf mere voiceover khatarnak hai",
        "Dugna remix dena padega",
        "Memes se kuch kuch hota hain, Anjali, tum nahi samjhogi",
        "It’s the memes you make right now, that make a difference"
    ],
    international: [
        "Why so serious? Let's put a smile on that face.",
        "Hello, is it memes you're looking for?",
        "In some cultures, it's rude to not laugh at a meme!",
        "I want you to deal with your problems by making memes!",
        "I'm gonna make a meme they must remix!",
        "Great memers are not born great. They grow great.",
        "Rule number one of Remixing - Fuck what they think!",
        "It’s the memes you make right now, that make a difference!"
    ]
}