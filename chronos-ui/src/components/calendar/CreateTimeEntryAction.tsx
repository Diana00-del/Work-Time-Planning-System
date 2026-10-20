import { Location } from "@/services/Locations";
import useTimeEntries, { CreateTimeEntry, TimeEntry } from "@/services/TimeEntires";
import { User } from "@/services/Users";
import useValidate from "@/utils/useValidate";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import React, { useImperativeHandle, useState } from "react";
import { Form } from "react-final-form";
import { bool, number, object, string } from "yup";
import SelectField from "../form/SelectField";
import { DatetimeField } from "../form/DatetimeField";
import TextField from "../form/TextField";
import { useSnackbarContext } from "@/contexts/Snacks";

export interface CreateTimeEntryActionProps {
  currentUser: User;
  users: User[];
  locations: Location[];
  onTimeEntryAdded: (timeEntry: TimeEntry) => void;
}

export interface CreateTimeEntryActionHandle {
  openDialog: (startTime: Date, endTime: Date) => void;
}

const CreateTimeEntryAction = React.forwardRef(CreateTimeEntryActionImpl);
function CreateTimeEntryActionImpl(
  { currentUser, users, locations, onTimeEntryAdded }: CreateTimeEntryActionProps,
  ref: React.Ref<CreateTimeEntryActionHandle>
) {
  const { add, addSubmitted } = useTimeEntries();
  const [open, setOpen] = useState(false);
  const [startTime, setStartTime] = useState<Date>();
  const [endTime, setEndTime] = useState<Date>();
  const { showSuccess, showError } = useSnackbarContext();

  useImperativeHandle(ref, () => ({
    openDialog: (startTime: Date, endTime: Date) => {
      setStartTime(startTime);
      setEndTime(endTime);
      setOpen(true);
    }
  }));

  const initialValues: Partial<CreateTimeEntry> & { createSubmitted: boolean } = {
    userId: currentUser.id,
    startTime: startTime?.toISOString(),
    endTime: endTime?.toISOString(),
    createSubmitted: false
  };

  const validationSchema = object({
    userId: number().required(),
    locationId: number().required(),
    startTime: string().required(),
    endTime: string().required(),
    description: string().max(1024),
    createSubmitted: bool(),
  });
  const validate = useValidate(validationSchema);

  const handleCreate = (values: CreateTimeEntry & { createSubmitted: boolean }) => {
    if (values.createSubmitted) {
      createSubmitted(values);
    } else {
      create(values);
    }
  }

  const create = (values: CreateTimeEntry) => {
    add(values)
      .then((timeEntry) => {
        onTimeEntryAdded(timeEntry);
        setOpen(false);
        showSuccess("Time entry created successfully", "Time Entry Created");
      })
      .catch((error) => showError(error.message, "Failed to create time entry"));
  };

  const createSubmitted = (values: CreateTimeEntry) => {
    addSubmitted(values)
      .then((timeEntry) => {
        onTimeEntryAdded(timeEntry);
        setOpen(false);
        showSuccess("Time entry created and submitted successfully", "Time Entry Created and Submitted");
      })
      .catch((error) => showError(error.message, "Failed to create and submit time entry"));
  };

  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="create-time-entry-dialog-title"
      aria-describedby="create-time-entry-dialog-description"
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle>Create Time Entry</DialogTitle>
      <Form initialValues={initialValues} validate={validate} onSubmit={handleCreate}>
        {({ handleSubmit, form, submitting, pristine }) => (
          <form onSubmit={handleSubmit}>
            <DialogContent>
              <SelectField id="userId" name="userId" label="User"
                options={users.map((user) => ({ value: `${user.id}`, label: user.firstName + ' ' + user.lastName }))}
              />
              <SelectField id="locationId" name="locationId" label="Location"
                options={locations.map((location) => ({ value: `${location.id}`, label: location.name }))}
              />
              <DatetimeField id="startTime" name="startTime" label="Start Time" />
              <DatetimeField id="endTime" name="endTime" label="End Time" />
              <TextField id="description" name="description" label="Description" multiline rows={4} />
            </DialogContent>
            <DialogActions>
              <Button
                onClick={() => {
                  form.reset();
                  setOpen(false);
                }}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={submitting || pristine}
              >
                Create
              </Button>
              <Button
                type="submit"
                disabled={submitting || pristine}
                onClick={() => {
                  form.change('createSubmitted', true);
                }}
              >
                Create and Submit
              </Button>
            </DialogActions>
          </form>
        )}
      </Form>
    </Dialog>
  );
}

export default CreateTimeEntryAction;
