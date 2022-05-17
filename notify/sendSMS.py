# Download the helper library from https://www.twilio.com/docs/python/install

import os
import re
from dotenv import load_dotenv
from twilio.rest import Client


# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
load_dotenv()
account_sid = os.environ['TWILIO_ACCOUNT_SID']
auth_token = os.environ['TWILIO_AUTH_TOKEN']
twillo_phone = os.environ['TWILIO_PHONE']

client = Client(account_sid, auth_token)

def check_number(desination_number):
    pattern = re.compile("^1?(\d{10})", re.IGNORECASE)
    return pattern.match(desination_number) is not None


def soil_moisture_alert(destination_number):
    send = check_number(destination_number)
    
    if send:
        msg = """ 
            WARNING!!! Soil moisture has reached a critical level, please water when convenient.   
        """
        send_message(msg, destination_number)
    else:
        print('Phone number is invalid')


def send_message(msg, destination_number):
    message = client.messages \
                    .create(
                        body=msg,
                        from_=twillo_phone,
                        to=destination_number
                    )
    print(message.sid)


### TEST
# EX Phone: 15551234567
soil_moisture_alert('')