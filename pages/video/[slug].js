import { gql, GraphQLClient } from 'graphql-request';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

export const getServerSideProps = async (pageContext) => {
  const url = process.env.ENDPOINT
  const graphQLClient = new GraphQLClient(url, {
    headers: {
      "Authorization" : process.env.REACT_CMS_ACCESS_TOKEN
    } 
  })

  const pageSlug = pageContext.query.slug
  
  const query = gql`
    query($pageSlug: String!) {
      video(where: {
          slug: $pageSlug
      }) {
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

    const variables = {
        pageSlug,
    }

    const data = await graphQLClient.request(query, variables)
    const video = data.video

    return {
        props: {
            video
        }
    }
}



const Video = ({ video }) => {
  
  const [watching, setWatching] = useState(false);

    return (
        <div>
            {!watching &&
              <>
                <Image className='video-image' src={video.thumbnail.url} alt={video.title} />
                <div className='info' >
                  <p>{video.tags.join(', ')}</p>
                  <p>{video.description}</p>
                  <Link href='/' passHref ><p>Go back</p></Link>
                  <button 
                    className='video-overlay'
                    onClick={() => {
                      watching ? setWatching(false) : setWatching(true)
                    }}
                  >PLAY</button>
                </div>
              </>
            }
            {watching && (
              <video width='100%' controls>
                <source src={video.mp4.url} type='video/mp4' />
              </video>
            )}
            <div className='info-footer' 
              onClick={() => {
                watching ? setWatching(false) : null
              }} 
            >
              {watching && <p>Stop Watching</p>}
            </div>
        </div>
    ); 
}

export default Video;
