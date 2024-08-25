import { formatDistanceToNow } from "date-fns";
import { HiPencilAlt } from "react-icons/hi";
import RemoveBtn from "./RemoveBtn";
import Link from "next/link";

interface Note {
  id: number;
  title: string;
  description: string;
  date: Date;
}

function Note({
  id,
  title,
  description,
  date,
}: Note) {
  const formattedDate = formatDistanceToNow(date, { addSuffix: true });
  
  return (
    <>
    <div>
      <h2 className="font-bold text-2xl">{title}</h2>
      <div>{description}</div>
      <div className="text-sm text-gray-500">
        Last updated: {formattedDate}
      </div>
    </div>

    <div className="flex gap-2">
      <RemoveBtn id={id} />

      <Link href={`/edit-note/${id}`}>
        <HiPencilAlt size={24} />
      </Link>
    </div>
    </>
  )
}

export default Note;