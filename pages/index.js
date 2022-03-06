import { gql, GraphQLClient } from 'graphql-request';
import Image from 'next/image';
import NavBar from '../components/Navbar';
import Section from '../components/Section';

export const getStaticProps = async () => {
  const url = process.env.ENDPOINT
  const graphQLClient = new GraphQLClient(url, {
    headers: {
      "Authorization" : process.env.REACT_CMS_ACCESS_TOKEN
    } 
  })
  
  const query = gql`
    query {
      video {
        createdAt,
        id,
        title,
        description,
        seen,
        slug,
        tags,
        thumbnail {
          url
        },
        mp4 {
          url
        }
      }
    }
  `

  const data = await graphQLClient.request(query)

  const videos = data.videos

  return {
    props:{
      videos
    }
  }
} 

export default function Home({ videos }) {

  const filterVideos = (videos, genre) => {
    return videos.filter((video) => video.tags.include(genre))
  }

  const unSeenVideos = (videos) => {
    return videos.filter(video => video.seen === false || video.seen === null)
  }

  const randomVideo = (videos) => {
    return videos[Math.floor(Math.random() * videos.length)]
  }

  return (
    <div className='app'>
      <NavBar />
      <div className='main-video'>
        <Image src={randomVideo(videos).thumbnail.url} alt={randomVideo(videos).title}/>
      </div>
      <div className='video-feed'>
        <Section genre={'Recommended for you'} videos={unSeenVideos(videos)}/>
        <Section genre={'Family'} videos={filterVideos(videos, 'family')}/>
        <Section genre={'Thriller'} videos={filterVideos(videos, 'thriller')}/>
        <Section genre={'Classic'} videos={filterVideos(videos, 'classic')}/>
        <Section id="pixar" genre={'Pixar'} videos={filterVideos(videos, 'pixar')}/>
        <Section id="marvel" genre={'Marvel'} videos={filterVideos(videos, 'thriller')}/>
        <Section id="nat-geo" genre={'National Geographic'} videos={filterVideos(videos, 'national-geographic')}/>
        <Section id="disney" genre={'Disney'} videos={filterVideos(videos, 'disney')}/>
        <Section id="star-wars" genre={'Star Wars'} videos={filterVideos(videos, 'star-wars')}/>
      </div>
    </div>
  )
}
