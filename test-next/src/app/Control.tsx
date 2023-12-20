"use client";

import {
  useParams,
  useRouter,
  useSelectedLayoutSegments,
} from "next/navigation";

export function Control() {
  const router = useRouter();
  const params = useParams();
  const id = params.id;
  const segments = useSelectedLayoutSegments();

  function onDelete() {
    const options = { method: "DELETE" };
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/topics/${id}`, options)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        router.replace("/");
        router.refresh();
      });
  }

  return (
    <ul>
      {id ? (
        segments[0] === "read" ? (
          <>
            <li>
              <a href={`/update/${id}`}>Update</a>
            </li>
            <li>
              <input type="button" value="delete" onClick={onDelete} />
            </li>
          </>
        ) : (
          <></>
        )
      ) : segments[0] === "create" ? (
        <></>
      ) : (
        <li>
          <a href="/create">Create</a>
        </li>
      )}
    </ul>
  );
}
