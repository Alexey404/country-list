import { AnimatedList } from "@/AnimatedList/AnimatedList";

export interface ListItem {
  flag_url?: string;
  name_ru: string;
  iso_code2: string;
  iso_code3: string;
}

export default async function Home() {
  const getCountry = async (): Promise<ListItem[]> => {
    return await fetch(
      "https://gist.githubusercontent.com/sanchezzzhak/8606e9607396fb5f8216/raw/39de29950198a7332652e1e8224f988b2e94b166/ISO3166_RU.json"
    ).then(res => res.json());
  };

  const country = await getCountry();

  return (
    <div className="page-wrapper">
      <h1 className="title">Список стран</h1>
      <AnimatedList list={country} />
    </div>
  );
}
