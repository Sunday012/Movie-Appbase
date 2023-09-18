import React, { useState, useEffect } from "react";
import "../App.css";
import "./Movie.css";
import Search from "../assets/search-interface-symbol.png";
import Skeleton,{SkeletonTheme} from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import axios from "axios";
export default function Home() {
  const [movies, setMovies] = useState([]);
  const [err, setErr] = useState("")
  const [firstMovies,setFirstMovies] = useState([])
  const [firstMovieImg,setFirstMovieImg] = useState("")
  const [firstMovietitle, setFirstMovieTitle] = useState("")
  const [firstMovieOverview, setFirstMovieOverview] = useState("")
  const [keywords, setKeyWords] = useState("");
  const [movieBief, setMovieBief] = useState("")
  const apiKey = import.meta.env.REACT_APP_API_KEY;
  let url3 = `https://api.themoviedb.org/3/search/movie?query=${keywords}&api_key=254781a1c046226f8871f5770c1e43fa`;
  let url2 = "https://api.themoviedb.org/3/trending/all/day?language=en-US&api_key=254781a1c046226f8871f5770c1e43fa"

const handleSearch = async () => {

const options = {
  method: 'POST',
  url: 'https://lemurbot.p.rapidapi.com/chat',
  headers: {
    'content-type': 'application/json',
    'X-RapidAPI-Key': '81d0e94123msh28dfdf005231dd5p13b059jsn88aab1e0473f',
    'X-RapidAPI-Host': 'lemurbot.p.rapidapi.com'
  },
  data: {
    bot: 'dilly',
    client: 'd531e3bd-b6c3-4f3f-bb58-a6632cbed5e2',
    message: `${keywords}`
  }
};

try {
	const chatRes = await axios.request(options);
  const res = await fetch(url3);
  const data = await res.json();
  // const botData = await chatRes.json();
  setMovies(data.results);
  setMovieBief(chatRes.data.data.conversation.output)
  console.log(movies);
	console.log(chatRes.data.data.conversation.output);
} catch (error) {
	console.error(error);
}
}

 useEffect(() => {
   const fetchData = async () => {
     try{
      const response = await fetch(url2);
      const data2 = await response.json();
      setFirstMovies(data2.results)
      setFirstMovieImg(data2.results[19].backdrop_path)
      setFirstMovieTitle(data2.results[19].title)
      setFirstMovieOverview(data2.results[19].overview)
      console.log(firstMovies)
     }catch(error){
      setErr(error)
     }

   }
 
   fetchData()
 },[])


  
  return (
    <div className="App">
      <div className="Ai-sidebar">
        <div className="Ai-sidebar-header">
          <div className="Ai-sidebar-header-text">
            <img src="" alt="" className="logo" />
            <span>MovieGPT</span>
          </div>
          <div className="chatMessage static">
            <img src="" alt="" className="gptlogo" />
            <p className="text">
              Hi, i'm MovieGPT an artificial intelligence that gives you recent information concerning the keyword you have inputed.{" "}
            </p>
          </div>
          <div className="chatMessage Bot">
            <img src="" alt="" className="gptlogo" />
            <p className="text">
             {movieBief}
            </p>
          </div>
        </div>
        <div className="Ai-sidebar-bottom">
          <div className="saved-box">
            <img src="" alt="" className="saved-img" />
            <p>Saved</p>
          </div>
          <div className="upgrade-box">
            <img src="" alt="" className="upgrade-img" />
            <p>Upgrade</p>
          </div>
        </div>
      </div>
      <div className="Movie-sidebar">
        <div className="movie-sidebar-first-container" style={{background: `url(https://image.tmdb.org/t/p/w500/${firstMovieImg})no-repeat center center/cover `,}}>
          <div className="Movie-sidebar-header">
            <a href="//" className="link">
              Movies
            </a>
            <a href="//" className="link">
              Tv-series
            </a>
            <a href="//" className="link">
              Upcoming
            </a>
          </div>
          <div className="Movie-sidebar-midbox">
            <div className="Appref">Movie Net</div>
            <div className="search-input">
              <input
                type="text"
                value={keywords}
                onChange={(e) => {
                  setKeyWords(e.target.value);
                }}
                className="input-box"
                placeholder="Search a movie with just a keyword.."
              />
              <button onClick={handleSearch}>
                <img src={Search} alt="search" className="search-icon" />
              </button>
            </div>
            <div className="movie-header-title">
              <span className="header-title-text">
              <SkeletonTheme baseColor="rgb(189, 184, 184)" highlightColor="rgb(129, 126, 126)">
                {firstMovietitle || <Skeleton />}
                </SkeletonTheme>
                </span>
              <div className="movie-header-titleinfo">
                <SkeletonTheme baseColor="rgb(189, 184, 184)" highlightColor="rgb(129, 126, 126)">
               {firstMovieOverview || <Skeleton count={3.5} duration={1.5}/>}
               </SkeletonTheme>
              </div>
              <button className="trailer-btn">Watch trailer</button>
            </div>
          </div>
        </div>

        {movies?.length > 0 ? (
          <div className="Movie-sidebar-movie-box">
            {movies.map((movie) => (
              <div className="Movie-sidebar-movies" style={{background: `url(https://image.tmdb.org/t/p/w300/${movie.poster_path}) no-repeat center center`}}>
                <div className="year">
                <SkeletonTheme baseColor="rgb(189, 184, 184)" highlightColor="rgb(129, 126, 126)">
                  {movie.release_date || <Skeleton width={120}/>}
                  </SkeletonTheme>
                  </div>
                <div className="movieInfo">
                <SkeletonTheme baseColor="rgb(189, 184, 184)" highlightColor="rgb(129, 126, 126)">
                  <span>{movie.title || <Skeleton />}</span>
                  </SkeletonTheme>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="Movie-sidebar-movie-box">
            {firstMovies.map((firstmovie) => (
               <div key={firstmovie.id} className="Movie-sidebar-movies" style={{background: `url(https://image.tmdb.org/t/p/w300/${firstmovie.poster_path}) no-repeat center center`}}>
               <div className="year">
               <SkeletonTheme baseColor="rgb(189, 184, 184)" highlightColor="rgb(129, 126, 126)">
                {firstmovie.release_date || <Skeleton width={120}/>}
                </SkeletonTheme>
                </div>
               <div className="movieInfo">
               <SkeletonTheme baseColor="rgb(189, 184, 184)" highlightColor="rgb(129, 126, 126)">
                 <span>{firstmovie.title || <Skeleton />}</span>
                 </SkeletonTheme>
               </div>
             </div>
            ))

            }
          </div>
        )}
      </div>
    </div>
  );
}
