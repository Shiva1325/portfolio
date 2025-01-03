import React from 'react';
import MailService from '../Service/EmailService';
import '../Styles/Contact.css';
import 'react-phone-number-input/style.css';
import PhoneInputWithCountrySelect from 'react-phone-number-input';
import { Card } from '@mui/material';
export default class Contact extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            from_name: '',
            reply_to: '',
            message: '',
            phone:""
        }
      }
    render() {
        return (
            <div className='container'>
                <Card className='card'>
                    <div className="contact">
                        <form id="contact-form" onSubmit={this.handleSubmit.bind(this)} method="POST">
                            <div className="form-group">
                                <label htmlFor="name">Name</label>
                                <input id='name' type="text" className="form-control" name="from_name" value={this.state.name} onChange={this.onNameChange.bind(this)} />
                            </div>
                            <div className="form-group PhoneDiv">
                                <label htmlFor="phone">Phone</label>
                                <PhoneInputWithCountrySelect international id='phone' defaultCountry='US' className="form-control" name='phone' value={this.state.phone} onChange={this.onPhoneChange.bind(this)} />
                                {/* <input id='phone' type="number" className="form-control" name='phone' value={this.state.phone} onChange={this.onPhoneChange.bind(this)} /> */}
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <input id='email' type="email" className="form-control" name='reply_to' value={this.state.email} onChange={this.onEmailChange.bind(this)} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="message">Message</label>
                                <textarea id='message' className="form-control" name="message" rows="5" value={this.state.message} onChange={this.onMessageChange.bind(this)} />
                            </div>
                            <div className='submitBtnDiv'>
                                <button type="submit" className="btn btn-primary button"> Submit Form </button>
                            </div>
                        </form>
                    </div>
                </Card>
                
            </div>
        )
    }
    onNameChange(event) {
        this.setState({from_name: event.target.value})
      }
    onPhoneChange(event) {
        console.log(event);
        this.setState({phone: event})
      }
    onEmailChange(event) {
        this.setState({reply_to: event.target.value})
      }
    onMessageChange(event) {
        this.setState({message: event.target.value})
      }
    handleSubmit(event) {
        event.preventDefault();
        MailService(event);
      }
}
