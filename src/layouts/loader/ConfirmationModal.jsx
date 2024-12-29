import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap"
import PropTypes from 'prop-types';

const ConfirmationModal = ({ isOpen, yes, no, loader, }) => {
  return (
    <Modal
      isOpen={isOpen}
      toggle={no}
      className="modal-dialog-centered"
    >
      <ModalHeader>
        Delete Order
      </ModalHeader>
      <ModalBody>
        Are you sure?
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={no}>Cancel</Button>
        <Button color="danger" disabled={loader} onClick={yes}>Delete</Button>
      </ModalFooter>
    </Modal>
  )
}

ConfirmationModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  yes: PropTypes.func.isRequired,
  no: PropTypes.func.isRequired,
  loader: PropTypes.bool.isRequired,
}

export default ConfirmationModal