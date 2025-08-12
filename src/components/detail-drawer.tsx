import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

interface DetailDrawerProps{
  title: string;
  triggerText?: string;
  renderForm: () => React.ReactNode;
}

export const DetailDrawer = ({
  title,
  renderForm,
  triggerText,
}: DetailDrawerProps) => {

  return (
    <>
      <Sheet>
        <SheetTrigger>{triggerText || "Detay"}</SheetTrigger>
        <SheetContent className="overflow-x-auto">
          <SheetHeader>
            <SheetTitle>{title}</SheetTitle>
            <SheetDescription>{renderForm()}</SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </>
  );
};
