import emailjs from '@emailjs/browser';

const service_id = 'service_uztxto7';
const template_id = 'template_529mmzc';
const user_id = 'twMPOez6jugAH_Te8';

export default function MailService(obj){
    SendMail(obj);
}

function SendMail(obj){
    emailjs.sendForm(service_id, template_id, obj.target, user_id)
    .then((result)=>{
        console.log(result.status);
    }, (error) => {
        console.log(error);
    })
}