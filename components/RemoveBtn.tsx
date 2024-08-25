"use client"

import { HiOutlineTrash } from "react-icons/hi";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supbase/server";

export default function RemoveBtn({ id }: { id: number }) {
  const router = useRouter();
  
  const removeNote = async () => {
    const confirmed = confirm("Are you sure?");

    if (confirmed) {
      try {
        const { error } = await supabase
          .from('notes') 
          .delete()
          .eq('id', id); 

        if (error) {
          throw error;
        }

        router.refresh();
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <button onClick={removeNote} className="text-slate-300">
      <HiOutlineTrash size={24} />
    </button>
  );
}
