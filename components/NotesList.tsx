import { supabase } from "@/lib/supbase/server";
import Note from "./Note";

interface Notes {
  id: number;
  title: string;
  description: string;
  updated_at: Date;
}

async function NotesList() {
  const { data: notes, error } = await supabase
    .from('notes')
    .select()
    .order('updated_at', { ascending: false }); 
    
  if (error) {
    console.log(error);
    return;
  }

  return (
    <>
    {notes?.map((note: Notes) => (
      <div
        key={note.id} 
        className="hover:bg-slate-300 hover:bg-opacity-15 transition-all duration-300 p-4 border border-slate-400 my-3 flex justify-between gap-5 items-start rounded-md"
      >
        <Note 
          id={note.id} 
          title={note.title} 
          description={note.description} 
          date={note.updated_at}
        />
      </div>
    ))}
    </>
  )
}

export default NotesList;