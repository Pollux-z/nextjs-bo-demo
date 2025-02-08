import { useDeleteInternalCharge } from "@/app/services/mutations";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { CiEdit } from "react-icons/ci";
import { MdDeleteForever } from "react-icons/md";

export default function OptionActionTableInternalCharge({
  id,
}: {
  id: string;
}) {
  const { data: session } = useSession();
  const sessionUserRole = session?.user.role;

  const { trigger } = useDeleteInternalCharge(id);

  const handleDelete = () => {
    const confirmDelete = confirm("Are you sure you want to delete this item?");
    if (confirmDelete) return trigger();
  };
  
  return (
    <div className="flex gap-1.5 justify-center items-center">
      <Link href={`/users/internalCharge/edit/${id}`}>
        <CiEdit
          size={18}
          className="bg-green-100 text-green-500  rounded-lg p-0.5"
        />
      </Link>
      {sessionUserRole === "Admin" && (
        <button onClick={handleDelete} type="button" title="Option">
          <MdDeleteForever
            size={18}
            className="bg-red-100 text-red-500  rounded-lg p-0.5"
          />
        </button>
      )}
    </div>
  );
}
