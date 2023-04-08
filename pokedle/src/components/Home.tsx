import * as React from "react"
import { useState, useEffect } from "react"
import { Link } from 'react-router-dom'

export function Home() {
    const [gameMode, setGameMode] = useState(1)

    function handleGameModeChange(event) {
        setGameMode(event.target.value);
    }

    return (
        <div>
            <div>Hello, you're in home</div>
            <select id="gameMode" value={gameMode} onChange={handleGameModeChange}>
                <option value="1">Gen I</option>
                <option value="2">Up to Gen II</option>
                <option value="3">Up to Gen III</option>
                <option value="4">Up to Gen IV</option>
                <option value="5">Up to Gen V</option>
                <option value="6">Up to Gen VI</option>
                <option value="7">Up to Gen VII</option>
                <option value="8">Up to Gen VIII</option>
            </select>

            <Link className="link" to={`/game/gen/${gameMode}`}>Start</Link>
        </div>
    )
}