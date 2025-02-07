import {TransactionType} from "@/lib/types";
import {useState} from "react";

type Props = {
    type: TransactionType
}

export default function CreateCategoryDialogue({type}: Props){
    const [open, setOpen] = useState(false);


}