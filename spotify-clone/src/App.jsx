import React from "react";
import Sidebar from "./components/Sidebar";
import Player from "./components/player";
import Display from "./components/Display";
import PlayerContextProvider, { PlayerContext } from "./context/PlayerContext";

const App = () => {
  return (
    <PlayerContextProvider>
      <div className="h-screen bg-black">
        <PlayerContext.Consumer>
          {({ audioRef, track, songsData }) => (
            <>
              {songsData.length !== 0 ? (
                <>
                  <div className="h-[90%] flex">
                    <Sidebar />
                    <Display />
                  </div>
                  <Player />
                </>
              ) : null}

              <audio
                ref={audioRef}
                preload="auto"
                src={track ? track.file : ""}
              ></audio>
            </>
          )}
        </PlayerContext.Consumer>
      </div>
    </PlayerContextProvider>
  );
};

export default App;
