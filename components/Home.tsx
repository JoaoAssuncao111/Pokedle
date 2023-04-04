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
            <select id="gameMode" value={gameMode} onChange={handleGameModeChange}>
                <option value="1">&lt;= Gen I</option>
                <option value="2">&lt;= Gen II</option>
                <option value="3">&lt;= Gen III</option>
                <option value="4">&lt;= Gen IV</option>
                <option value="5">&lt;= Gen V</option>
                <option value="6">&lt;= Gen VI</option>
                <option value="7">&lt;= Gen VII</option>
                <option value="8">&lt;= Gen VIII</option>
            </select>
        </div>
    )
}