export type PeopleProps = {
  info:
    | {
        username: string;
      }
    | undefined;
};

export default function People({ info }: PeopleProps) {
  return <div></div>;
}
