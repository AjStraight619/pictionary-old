import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

export default function WordSelection() {
  const [words, setWords] = useState([]);
  const fetchWords = async () => {
    const response = await fetch(`/api/words?mode=${"easy"}`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  };

  const { data, refetch, isFetching, error } = useQuery({
    queryKey: ["word"],
    queryFn: fetchWords,
    refetchOnMount: false,
    enabled: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  useEffect(() => {
    if (data && data.words) {
      setWords(data.words);
    }
  }, [data]);

  console.log("words: ", words);
  console.log("data:", data);

  return (
    <div className="flex flex-row items-center justify-center gap-x-2">
      {words.map((word, idx) => (
        <div key={idx}>{word}</div>
      ))}
    </div>
  );
}
