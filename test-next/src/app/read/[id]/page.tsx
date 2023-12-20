export default async function Read(props: any) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/topics/${props.params.id}`,
    { cache: "no-store" }
  );
  const topic = await response.json();

  return (
    <>
      <hr />
      <h2>{topic.title}</h2>
      {topic.body}
      <hr />
    </>
  );
}
