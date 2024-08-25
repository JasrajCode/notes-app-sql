"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supbase/server";
import { useForm, type FieldValues } from "react-hook-form";

export default function EditNote({ id }: { id : number }) {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm();

  useEffect(() => {
    const fetchNote = async () => {
      const { data: note, error } = await supabase
        .from("notes")
        .select("title, description")
        .eq("id", id)
        .single();

      if (error) {
        console.error("Error fetching note:", error);
      } else {
        setValue("title", note.title);
        setValue("description", note.description);
      }
    };

    fetchNote();
  }, [id, setValue]);

  const onSubmit = async (data: FieldValues) => {
    try {
      const { title, description } = data;
      const updated_at = new Date().toISOString() ;
      const { error } = await supabase
        .from("notes")
        .update({ title, description, updated_at })
        .eq("id", id);

      if (error) throw error;

      router.push("/");
      router.refresh();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
      <input
        {...register("title", {
          required: "Title is required",
          maxLength: {
            value: 100,
            message: "Title must be less than 100 characters",
          },
        })}
        type="text"
        placeholder="Title"
        className="p-4 border border-slate-400 bg-[#222] rounded-md"
      />
      {errors.title && (
        <p className="text-red-500">{`${errors.title.message}`}</p>
      )}

      <input
        {...register("description", {
          required: "Description is required",
        })}
        type="text"
        placeholder="Description"
        className="p-4 border border-slate-400 bg-[#222] rounded-md"
      />
      {errors.description && (
        <p className="text-red-500">{`${errors.description.message}`}</p>
      )}

      <button
        disabled={isSubmitting}
        type="submit"
        className="bg-slate-200 text-[#CE7979] py-2 px-4 rounded-md w-fit mt-6"
      >
        Update Note
      </button>
    </form>
  );
}
