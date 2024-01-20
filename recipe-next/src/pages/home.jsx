import React from "react";
import "../app/globals.css";
import Link from "next/link";
export default function home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <h1 className="text-4xl font-bold text-center">Recipe app</h1>
      <Link
        className="btn btn-edit mt-8"
        type="button"
        onClick={() => handleEditClick(index)}
        id="edit"
        href={"/create-item"}
      >
        Create Item
      </Link>
    </main>
  );
}
