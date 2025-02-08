import React, { use, useEffect, useReducer, useState } from "react";
import AddUserSeller from "./AddUserSeller";
import ListSellerInternalCharge from "./ListSellerInternalCharge";
import { InternalChargeType } from "@/interfaces/InternalCharge";
import { useSession } from "next-auth/react";

let initialState: never[] = [];

interface SellerStateType {
  userId: string;
  indexId: number;
  manDay: number;
  costPerManDay: number;
  totalCost: number;
}

function reducer(state: SellerStateType[], action: any) {
  switch (action.type) {
    case "added": {
      return [
        ...state,
        {
          userId: action.userId,
          indexId: action.indexId,
          manDay: action.manDay,
          costPerManDay: action.costPerManDay,
          totalCost: action.totalCost,
        },
      ];
    }
    case "changed": {
      return state.map((seller: any) => {
        if (seller.indexId === action.item.indexId) {
          return action.item;
        } else {
          return seller;
        }
      });
    }
    case "deleted": {
      return state.filter((item: any) => item.indexId !== action.indexId);
    }
    case "reset": {
      return action.payload;
    }
    default: {
      return state;
    }
  }
}

function SellerInternalCharge({
  setSelectedSeller,
  sellerInternChagres,
  // internalChargeById,
  enableEdit,
}: {
  setSelectedSeller: any;
  sellerInternChagres: any;
  // internalChargeById: InternalChargeType;
  enableEdit: boolean;
}) {
  const { data: session } = useSession();
  const sessionUserId = session?.user?.id;
  const [state, dispatch] = useReducer(reducer, sellerInternChagres);
  let id = state?.length + 1 || 1;

  function handleAdd({
    userId,
    manDay,
    costPerManDay,
    totalCost,
  }: {
    userId: string;
    manDay: number;
    costPerManDay: number;
    totalCost: number;
  }) {
    dispatch({
      type: "added",
      indexId: id,
      userId: userId,
      manDay: manDay,
      costPerManDay: costPerManDay,
      totalCost: totalCost,
    });
  }

  function handleChange(item: any) {
    dispatch({
      type: "changed",
      item: item,
    });
  }

  function handleDelete(indexId: number) {
    dispatch({
      type: "deleted",
      indexId: indexId,
    });
  }

  useEffect(() => {
    dispatch({
      type: "reset",
      payload: sellerInternChagres,
    });
  }, [sellerInternChagres]);

  useEffect(() => {
    setSelectedSeller(state);
  }, [state]);

  return (
    <>
      {!enableEdit && <AddUserSeller handleAdd={handleAdd} />}
      <div className="mt-4">
        {state?.length > 0 ? (
          <ListSellerInternalCharge
            sellerState={state}
            onChangeSeller={handleChange}
            onDeleteSeller={handleDelete}
          />
        ) : (
          <p className="text-center py-3 bg-green-100 text-green-500 font-bold rounded-lg">
            No data
          </p>
        )}
      </div>
    </>
  );
}

export default SellerInternalCharge;
