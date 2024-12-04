import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface CalendarDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  artist: string;
  venue: string;
  onConfirm: () => void;
}

export const CalendarDialog = ({
  open,
  onOpenChange,
  artist,
  venue,
  onConfirm,
}: CalendarDialogProps) => {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Add to Google Calendar</AlertDialogTitle>
          <AlertDialogDescription>
            Would you like to add {artist} at {venue} to your Google Calendar?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>No</AlertDialogCancel>
          <AlertDialogAction onClick={onConfirm}>Yes</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};