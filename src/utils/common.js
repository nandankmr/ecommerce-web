import store from "../store/Store";
import {setAlertMessage, hideAlertMessage} from "../store/CommonSlice";

/**
 * Shows an alert message with the given message and options.
 * @param {string} message - The message to be shown in the alert.
 * @param {Object} [options] - The options for the alert.
 * @param {string} [options.type] - The type of the alert (e.g. 'success', 'error', etc.).
 * @param {number} [options.timeout] - The time in milliseconds after
 *  which the alert should be hidden.
 * @param {boolean} [options.disableTimeout] - Whether to disable the timeout for hiding the alert.
 * @returns {void}
 */
export const showAlert = (message, {type, timeout, disableTimeout} = {}) => {
    store.dispatch(setAlertMessage({message, type}));
  
    if (!disableTimeout) {
      setTimeout(() => {
        store.dispatch(hideAlertMessage());
      }, timeout || 5000);
    }
  };