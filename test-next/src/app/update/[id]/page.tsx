"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Update() {
  const router = useRouter();
  const params = useParams();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const url = `${process.env.NEXT_PUBLIC_API_URL}/topics/${params.id}`;

  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        setTitle(result.title);
        setBody(result.body);
      });
  }, []);

  const onSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      title: { value: string };
      body: { value: string };
    };
    const title = target.title.value;
    const body = target.body.value;
    const options = {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ title, body }),
    };
    fetch(url, options)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        const lastId = result.id;
        router.push(`/read/${lastId}`);
        router.refresh();
      });
  };

  return (
    <form onSubmit={onSubmit}>
      <p>
        <input
          type="text"
          name="title"
          placeholder="title"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
      </p>
      <p>
        <textarea
          name="body"
          placeholder="body"
          value={body}
          onChange={(e) => {
            setBody(e.target.value);
          }}
        ></textarea>
      </p>
      <p>
        <input type="submit" value="update" />
      </p>
    </form>
  );
}
