import { Modal } from "antd";
import { notification } from "antd";

// DIALOGS
const success = (title = "Success", message = "Success") => {
  Modal.success({ title: title, content: message });
};

const error = (title = "Error", message = "Error") => {
  Modal.error({ title: title, content: message });
};

const warning = (title = "Warning", message = "Warning") => {
  Modal.warning({ title: title, content: message });
};

const info = (title = "Info", message = "Info") => {
  Modal.info({ title: title, content: message });
};

// PUSH NOTIFICATIONS
const successNotification = (title = "Success", message = "Success") => {
  notification.success({
    message: title,
    description: message,
    placement: "topRight",
  });
};

const errorNotification = (title = "Error", message = "Error") => {
  notification.error({
    message: title,
    description: message,
    placement: "topRight",
  });
};

export { success, error, warning, info, successNotification, errorNotification };
