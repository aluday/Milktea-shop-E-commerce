import { Modal } from "antd";

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

export { success, error, warning, info };
