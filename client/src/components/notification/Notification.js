import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Spinner from '../layout/Spinner';
import { connect } from 'react-redux';
import { getNotifications } from '../../actions/notification';
import NotificationItem from './NotificationItem';
import { setAlert } from '../../actions/alert';
// import { deleteNotification } from '../../actions/notification';

const Notification = ({ setAlert, getNotifications, notification: { notifications, loading } }) => {
  // const [allNotifications, setAllNotifications] = useState(true);
  // const [read, setRead] = useState(false);
  // const [unread, setUnread] = useState(false);

  useEffect(() => {
    getNotifications();
  }, [getNotifications]);

  return loading ? (
    <Spinner />
  ) : (
    <Fragment>
      <h1 className='large text-primary'>
        <i className='fas fa-bell'></i>
        {` `}Notifications
      </h1>
      <p className='lead'>All Your Notifications</p>
      <div className='notification'>
        <table className='table'>
          <thead>
            <tr>
              <th>All Notifications</th>
              <th>{notifications.length}</th>
            </tr>
            <tr>
              <th>Unread</th>
              <th>{notifications.filter(notification => notification.status === false).length}</th>
            </tr>
            <tr>
              <th>Read</th>
              <th>{notifications.filter(notification => notification.status === true).length}</th>
            </tr>
          </thead>
        </table>
        <table className='table'>
          <thead>
            <tr>
              <th>Notifications</th>
            </tr>
          </thead>
          <tbody>
            {notifications.map(notification => (
              <NotificationItem
                key={notification._id}
                id={notification._id}
                text={notification.text}
                date={notification.date}
                link={notification.linkTo}
                className={`list ${
                  notification.status ? 'notification-item' : 'notification-hover'
                }`}
              />
            ))}
          </tbody>
        </table>
      </div>
    </Fragment>
  );
};

Notification.propTypes = {
  getNotifications: PropTypes.func.isRequired,
  notification: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({ auth: state.auth, notification: state.notification });

export default connect(mapStateToProps, { setAlert, getNotifications })(Notification);
