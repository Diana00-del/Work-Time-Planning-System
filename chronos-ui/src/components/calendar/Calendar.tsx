import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction';
import { useEffect, useRef, useState } from 'react';
import useUsers, { User } from '@/services/Users';
import useLocations, { Location } from '@/services/Locations';
import useTimeEntries, { TimeEntry } from '@/services/TimeEntires';
import CreateTimeEntryAction, { CreateTimeEntryActionHandle } from './CreateTimeEntryAction';
import TimeEntryDetailsDialog, { TimeEntryDetailsDialogHandle } from './TimeEntryDetailsDialog';

const status = {
  'DRAFT': '#ffcd85', 
  'PENDING': '#fff494',
  'APPROVED': '#d2f5b0',
  'REJECTED': '#fcbdbd'
} as const;

export default function Calendar() {
  const { self: getCurrentUser, getAll: getAllUsers } = useUsers();
  const { getAll: getAllLocations } = useLocations();
  const { getAll: getAllTimeEntries, moveTimeEntry } = useTimeEntries();

  const [currentUser, setCurrentUser] = useState<User>({} as User);
  const [users, setUsers] = useState<User[]>([]);
  const [locations, setLocations] = useState<Location[]>([]);

  const createActionHandle = useRef<CreateTimeEntryActionHandle>(null);
  const detailsDialogHandle = useRef<TimeEntryDetailsDialogHandle>(null);

  const [events, setEvents] = useState<any[]>([]);

  useEffect(() => {
    getCurrentUser().then(setCurrentUser);
    getAllUsers().then(setUsers);
    getAllLocations().then(setLocations);
    getAllTimeEntries().then((timeEntries) => {
      setEvents(timeEntries.map((timeEntry) => ({
        id: timeEntry.id.toString(),
        title: `${timeEntry.user.firstName} ${timeEntry.user.lastName} - ${timeEntry.location.name}`,
        start: timeEntry.startTime,
        end: timeEntry.endTime,
        backgroundColor: status[timeEntry.status],
        textColor: 'black',
        extendedProps: timeEntry
      })));
    });
  }, []);

  const addTimeEntryToCalendar = (timeEntry: TimeEntry) => {
    setEvents((events) => [
      ...events,
      {
        id: timeEntry.id.toString(),
        title: `${timeEntry.user.firstName} ${timeEntry.user.lastName} - ${timeEntry.location.name}`,
        start: timeEntry.startTime,
        end: timeEntry.endTime,
        backgroundColor: status[timeEntry.status],
        textColor: 'black',
        extendedProps: timeEntry
      }
    ]);
  };

  return (
    <>
      <FullCalendar
        locale={'en-GB'}
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
        }}
        initialView="dayGridMonth"
        events={events}
        selectable
        editable
        select={(info) => {
          createActionHandle.current?.openDialog(info.start, info.end);
        }}
        eventClick={(info) => {
          detailsDialogHandle.current?.openDialog(info.event.extendedProps as TimeEntry);
        }}
        eventChange={(info) => {
          moveTimeEntry(
            info.event.extendedProps.id,
            { startTime: info.event.startStr, endTime: info.event.endStr }
          );
        }}
        eventTimeFormat={{
          hour: 'numeric',
          minute: '2-digit',
          hour12: false
        }}
      />
      <CreateTimeEntryAction
        currentUser={currentUser}
        users={users}
        locations={locations}
        ref={createActionHandle}
        onTimeEntryAdded={addTimeEntryToCalendar}
      />
      <TimeEntryDetailsDialog
        currentUser={currentUser}
        users={users}
        locations={locations}
        ref={detailsDialogHandle}
        onTimeEntryChanged={(timeEntry) => {
          setEvents((events) => events.map((event) => {
            if (event.id === timeEntry.id.toString()) {
              return {
                ...event,
                title: `${timeEntry.user.firstName} ${timeEntry.user.lastName} - ${timeEntry.location.name}`,
                start: timeEntry.startTime,
                end: timeEntry.endTime,
                backgroundColor: status[timeEntry.status],
                textColor: 'black',
                extendedProps: timeEntry
              };
            }
            return event;
          }));
        }}
        onTimeEntryDeleted={(timeEntry) => {
          setEvents((events) => events.filter((event) => event.id !== timeEntry.id.toString()));
        }}
      />
    </>
    
  );
}
