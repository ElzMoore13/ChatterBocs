import React from 'react';

const Notification = (props) => {
  //display the notification content
  return(<div className="message system">
            <span className="notification-content">
              {props.notification.content}
            </span>
         </div>);
}

module.exports = Notification;
