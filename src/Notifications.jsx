import React, {Component} from 'react';

const Notification = (props) => {
  return(<div className="message system">
            <span className="notification-content">
              {props.notification.content}
            </span>
         </div>);
}

module.exports = Notification;
