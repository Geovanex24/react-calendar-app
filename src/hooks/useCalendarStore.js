import { useDispatch, useSelector } from "react-redux";
import {
  onAddNewEvent,
  onDeleteEvent,
  onSetActiveEvent,
  onUpdateEvent,
} from "../store";

export const useCalendarStore = () => {
  const dispatch = useDispatch();
  const { events, activeEvent } = useSelector((state) => state.calendar);

  const setActiveEvent = (calendarEvent) => {
    dispatch(onSetActiveEvent(calendarEvent));
  };

  const startSavingEvent = async (calendarEvent) => {
    // TODO: llegar al backend
    //Todo bien
    if (calendarEvent._id) {
      //Actualizando
      dispatch(onUpdateEvent({ ...calendarEvent }));
      // await updateEvent(calendarEvent);
    } else {
      //Creando
      dispatch(
        onAddNewEvent({
          ...calendarEvent,
          _id: new Date().getTime(),
        })
      );
      // await createEvent(calendarEvent);
    }
    // await saveEventToServer(calendarEvent);
  };

  const startDeletingEvent = () => {
    // Todo: Llegar al backend
    dispatch(onDeleteEvent());
  };

  return {
    //* Properties
    events,
    activeEvent,
    hasEventSelected: !!activeEvent,

    //* Methods
    setActiveEvent,
    startSavingEvent,
    startDeletingEvent,
  };
};
