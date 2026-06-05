"use client";

import Button from "@/Ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { X } from "lucide-react";

export default function DeleteBrand({ id }) {
  const queryclient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationKey: ["delete-brand"],
    mutationFn: async () => {
      const response = await fetch(`http://localhost:4000/api/brand/${id}`, {
        method: "DELETE",
        headers: {
          "Contetn-type": "application/json",
        },
        credentials: "include",
      });
      const js = await response.json();
      return js;
    },
    onSuccess: () => {
      queryclient.invalidateQueries({ queryKey: ["brand"] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  return (
    <Button
      disabled={isPending}
      click={mutate}
      className={"w-fit border-1 border-[#b50b2deb] p-[4px] h-fit bg-[#b50b2deb] hover:bg-[#ec8095]"}
    >
      <X size={15}  />
    </Button>
  );
}
