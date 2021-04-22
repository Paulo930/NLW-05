import { GetStaticProps } from "next";
import { format, parseISO } from "date-fns";
import ptBR from "date-fns/locale/pt-BR"
import styles from "./home.module.scss"
import { api } from "../services/api";
import { convertDurationToTimeString } from "../util/convertDurationToTimeString";

type Episode = {
  id: string;
  title: string;
  members: string;
  publishedAt: string;
  thumbnail: string;
  description: string;
  duration: number;
  durationString: string;
  url: string;
}
type HomeProps = {
  episodes: Episode[],
}

export default function Home(props: HomeProps) {
  return (
    <div className={styles.homepage}>
      <section className={styles.latestEpisodes}>
        <h2>Últimos lançamentos</h2>
        <ul>
          
        </ul>
      </section>
      <section className={styles.allEpisodes}></section>
    </div>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const { data } = await api.get('episodes', {
    params: {
      _limit: 12,
      _sort: 'published_at',
      _order: 'desc'
    }
  })

  const episodes = data.map(episode => {
    return {
      id: episode.id,
      title: episode.title,
      thumbnail: episode.thumbnail,
      members: episode.members,
      publishedAt: format(parseISO(episode.published_at), "d MMM yy",{
        locale: ptBR
      }),
      duration: Number(episode.file.duration),
      durationString: convertDurationToTimeString(Number(episode.file.duration)),
      description: episode.description,
      url: episode.file.url,
    }
  })

   return {
     props: {
       episodes
     },
     revalidate: 68 * 68 * 8,
   }
}
