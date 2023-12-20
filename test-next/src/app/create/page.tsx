"use client";

import { useRouter } from "next/navigation";

export default function Create() {
  const router = useRouter();
  return (
    <form
      onSubmit={(e: React.SyntheticEvent) => {
        e.preventDefault();
        const target = e.target as typeof e.target & {
          title: { value: string };
          body: { value: string };
        };
        const title = target.title.value;
        const body = target.body.value;
        const options = {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({ title, body }),
        };
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/topics`, options)
          .then((response) => response.json())
          .then((result) => {
            console.log(result);
            const lastId = result.id;
            router.push(`/read/${lastId}`);
            router.refresh();
          });
      }}
    >
      <p>
        <input type="text" name="title" placeholder="title" />
      </p>
      <p>
        <textarea name="body" placeholder="body"></textarea>
      </p>
      <p>
        <input type="submit" value="create" />
      </p>
    </form>
  );
}
