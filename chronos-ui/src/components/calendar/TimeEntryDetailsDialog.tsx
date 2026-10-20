import { Location } from "@/services/Locations";
import useTimeEntries, { TimeEntry, UpdateTimeEntry } from "@/services/TimeEntires";
import { User } from "@/services/Users";
import { ExpandMore } from "@mui/icons-material";
import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Dialog, DialogContent, DialogTitle, Typography } from "@mui/material";
import React, { useImperativeHandle, useState } from "react";
import { Form } from "react-final-form";
import TextField from "../form/TextField";
import SelectField from "../form/SelectField";
import { DatetimeField } from "../form/DatetimeField";
import { useSnackbarContext } from "@/contexts/Snacks";

export interface TimeEntryDetailsDialogProps {
  currentUser: User;
  users: User[];
  locations: Location[];
  onTimeEntryChanged: (timeEntry: TimeEntry) => void;
  onTimeEntryDeleted: (timeEntry: TimeEntry) => void;
}

export interface TimeEntryDetailsDialogHandle {
  openDialog: (timeEntry: TimeEntry) => void;
}

const TimeEntryDetailsDialog = React.forwardRef(TimeEntryDetailsDialogImpl);
function TimeEntryDetailsDialogImpl(
  { currentUser, users, locations, onTimeEntryChanged, onTimeEntryDeleted }: TimeEntryDetailsDialogProps,
  ref: React.Ref<TimeEntryDetailsDialogHandle>
) {
  const { update: updateTimeEntry, deleteTimeEntry, submitTimeEntry, approveTimeEntry, rejectTimeEntry } = useTimeEntries();
  const [open, setOpen] = useState(false);
  const [showRejectionForm, setShowRejectionForm] = useState(false);
  const [timeEntry, setTimeEntry] = useState<TimeEntry>({} as TimeEntry);
  const { showSuccess, showError } = useSnackbarContext();

  useImperativeHandle(ref, () => ({
    openDialog: (timeEntry: TimeEntry) => {
      setTimeEntry(timeEntry);
      setOpen(true);
    }
  }));

  const updateTimeEntryHandler = (values: UpdateTimeEntry) => {
    updateTimeEntry(timeEntry.id, values)
      .then((timeEntry) => {
        onTimeEntryChanged(timeEntry);
        setTimeEntry(timeEntry);
        showSuccess("Time entry updated successfully", "Time Entry Updated");
      })
      .catch((error) => showError(error.message, "Failed to update time entry"));
  }

  const submitTimeEntryHandler = () => {
    submitTimeEntry(timeEntry.id)
      .then((timeEntry) => {
        onTimeEntryChanged(timeEntry);
        setTimeEntry(timeEntry);
        showSuccess("Time entry submitted successfully", "Time Entry Submitted");
      })
      .catch((error) => showError(error.message, "Failed to submit time entry"));
  }

  const approveTimeEntryHandler = () => {
    approveTimeEntry(timeEntry.id)
      .then((timeEntry) => {
        onTimeEntryChanged(timeEntry);
        setTimeEntry(timeEntry);
        showSuccess("Time entry approved successfully", "Time Entry Approved");
      })
      .catch((error) => showError(error.message, "Failed to approve time entry"));
  }

  const openRejectionForm = () => {
    setShowRejectionForm(true);
  }

  const closeRejectionForm = () => {
    setShowRejectionForm(false);
  }

  const rejectTimeEntryHandler = (values: { reason: string }) => {
    rejectTimeEntry(timeEntry.id, values.reason)
      .then((timeEntry) => {
        onTimeEntryChanged(timeEntry);
        closeRejectionForm();
        setTimeEntry(timeEntry);
        showSuccess("Time entry rejected successfully", "Time Entry Rejected");
      })
      .catch((error) => showError(error.message, "Failed to reject time entry"));
  }

  const deleteTimeEntryHandler = () => {
    deleteTimeEntry(timeEntry.id)
      .then(() => {
        onTimeEntryDeleted(timeEntry);
        setOpen(false);
        showSuccess("Time entry deleted successfully", "Time Entry Deleted");
      })
      .catch((error) => showError(error.message, "Failed to delete time entry"));
  };

  if (!timeEntry.id) {
    return null;
  }

  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="time-entry-details-dialog-title"
      aria-describedby="time-entry-details-dialog-description"
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle id="time-entry-details-dialog-title" variant="h5">
        Time Entry Details
      </DialogTitle>
      <DialogContent>
        <Accordion defaultExpanded>
          <AccordionSummary expandIcon={<ExpandMore />}>
            <Typography variant="h6">
              Edit Time Entry
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Form
              onSubmit={updateTimeEntryHandler}
              initialValues={{
                userId: timeEntry.user.id,
                locationId: timeEntry.location.id,
                startTime: timeEntry.startTime,
                endTime: timeEntry.endTime,
                description: timeEntry.description
              }}
            >
              {({ handleSubmit, submitting, pristine }) => (
                <form onSubmit={handleSubmit}>
                  <Box display="flex" flexDirection="column" gap={2}>
                    <SelectField id="userId" name="userId" label="User"
                      options={users.map((user) => ({ value: `${user.id}`, label: user.firstName + ' ' + user.lastName }))}
                    />
                    <SelectField id="locationId" name="locationId" label="Location"
                      options={locations.map((location) => ({ value: `${location.id}`, label: location.name }))}
                    />
                    <DatetimeField id="startTime" name="startTime" label="Start Time" />
                    <DatetimeField id="endTime" name="endTime" label="End Time" />
                    <TextField id="description" name="description" label="Description" multiline rows={4} />
                    <Box display="flex" flexDirection="row" gap={2}>
                      <Button variant="contained" color="primary" type="submit" disabled={submitting || pristine} fullWidth>
                        Save
                      </Button>
                      <Button variant="contained" color="secondary" onClick={() => setOpen(false)} disabled={submitting} fullWidth>
                        Cancel
                      </Button>
                    </Box>
                  </Box>
                </form>
              )}
            </Form>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMore />}>
            <Typography variant="h6">
              Time Entry Status
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            { timeEntry.status === 'DRAFT' && (
              <Typography variant="body1">
                Submit this time entry to be reviewed by a manager.
              </Typography>
            )}
            { timeEntry.status === 'PENDING' && (
              <Typography variant="body1">
                Approve or reject this time entry.
              </Typography>
            )}
            { timeEntry.status === 'APPROVED' && (
              <Typography variant="body1">
                This time entry has been approved.
              </Typography>
            )}
            { timeEntry.status === 'REJECTED' && (
              <>
                <Typography variant="body1">
                  This time entry has been rejected.
                </Typography>
                <Typography variant="body1">
                  Reason: {timeEntry.rejectionReason}
                </Typography>
              </>
            )}
            { showRejectionForm ? (
              <Box mt={2}>
                <Form initialValues={{ reason: '' }} onSubmit={rejectTimeEntryHandler}>
                  {({ handleSubmit, submitting, pristine }) => (
                    <form onSubmit={handleSubmit}>
                      <Box display="flex" flexDirection="column" gap={2}>
                        <TextField
                          id="reason"
                          name="reason"
                          label="Reason"
                          multiline
                          rows={4}
                          required
                        />
                        <Box display="flex" flexDirection="row" gap={2}>
                          <Button variant="contained" color="primary" type="submit" disabled={submitting || pristine} fullWidth>
                            Reject
                          </Button>
                          <Button variant="contained" color="secondary" onClick={closeRejectionForm} disabled={submitting} fullWidth>
                            Cancel
                          </Button>
                        </Box>
                      </Box>
                    </form>
                  )}
                </Form>
              </Box>
            ) : (
              <Box mt={2} display="flex" flexDirection="row" gap={2}>
                { timeEntry.status === 'DRAFT' && (
                  <Button fullWidth variant="contained" color="primary" onClick={submitTimeEntryHandler}>
                    Submit
                  </Button>
                )}
                { timeEntry.status === 'PENDING' && (
                  <Button fullWidth variant="contained" color="primary" onClick={approveTimeEntryHandler}>
                    Approve
                  </Button>
                )}
                { timeEntry.status === 'PENDING' && (
                  <Button fullWidth variant="contained" color="secondary" onClick={openRejectionForm}>
                    Reject
                  </Button>
                )}
              </Box>
            )}
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMore />}>
            <Typography variant="h6">
              Delete Time Entry
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body1">
              Are you sure you want to delete this time entry?
            </Typography>
            <Typography variant="body1">
              This action cannot be undone.
            </Typography>
            <Box mt={2}>
              <Button fullWidth variant="contained" color="secondary" onClick={deleteTimeEntryHandler}>
                Delete
              </Button>
            </Box>
          </AccordionDetails>
        </Accordion>
      </DialogContent>
    </Dialog>
  );
}

export default TimeEntryDetailsDialog;
