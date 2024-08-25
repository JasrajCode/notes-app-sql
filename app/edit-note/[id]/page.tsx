import EditNote from "@/components/EditNote";

export default function EditNotePage({ params : { id }}: { params: { id: number } }) {
  return (
    <EditNote id={id} />
  );
}
