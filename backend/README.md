# QRCade Backend

## Design

### Scanning a QR Code
```
WHEN QR CODE Scanner (PLAYER)


[CHECK] Scanner.Lobby.LobbyType != "LOOTER"
    [IF EQ]
        RETURN FAILED MSG = "LOBBY_INVALID_TYPE"
---

[CHECK] Scanner.Lobby == Scanned.Lobby
    [IF NE]
        RETURN FAILED MSG = "LOBBY_INVALID_DIFFERENT"

    [IF EQ]
        [CHECK] Scanner.Lobby.LobbyType == "SHOOTER-FFA"
            [IF EQ]
                ADD HIT {Scanner, Scanner, Timestamp}
                RETURN SUCCESS MSG = "HIT_VALID_RECORDED"

        [CHECK] Scanner.Lobby.LobbyType == "SHOOTER-TDM"

            [CHECK] Scanner.Team == UNDEFINED
                [IF EQ]
                    RETURN FAILED MSG = "TEAM_INVALID_SCANNER"

            [CHECK] Scanned.Team == UNDEFINED
                [IF EQ]
                    RETURN FAILED MSG = "TEAM_INVALID_SCANNED"

            [CHECK] Scanner.Team == Scanned.Team
                [IF EQ]
                    RETURN FAILED MSG = "TEAM_INVALID_IDENTICAL"
                [ELSE]
                    ADD HIT {Scanner, Scanner, Timestamp}
                    RETURN SUCCESS MSG = "HIT_VALID_RECORDED"
```
```
WHEN QR CODE SCANNED (FLAG)

[CHECK] Scanner.Lobby == Flag.Lobby
    [IF NE]
        RETURN FAILED MSG "LOBBY_INVALID_DIFFERENT"

    [IF EQ]
        [CHECK] (Hits.Scanner, Hits.Scanned) == Scanner,Flag
            [IF EQ]
                RETURN ERROR MSG = "HIT_INVALID_DUPLICATE"
            [IF NE]
                RETURN SUCCESS MSG = "HIT_VALID_RECORDED"

```


## User Stories

* A user logs in and is greeted with a lobby screen of available lobbies or the ability to skip (If Admin)
* A user's score resets when they leave a lobby
* A user can leave a lobby from their dashboard
* When a user logs out from their dashboard, their score resets and they leave the lobby they were in
---
* When a user views their score in a TDM game they see their score and their team score
* When a user views their score in a FFA game they see their own score and their team score
* When a user views their score in a LOOTER game they see how many theyve scanned so far out of a total number of points available
* In a TDM lobby, a player will be able to see the "Scorefeed" under the scores.
* In a FFA lobby, a user will be able to see their own "Scorefeed" under the scores
* In a LOOT lobby, a user will be able to see the other users scores to track progress under their score
---
* When scanning, a hit screen will show showing confirmation or error
* This screen will show who the player hit (displayname)
---
* When a player scans a lobby flag they will receive confirmation or error if the point counted
* When a player scans a lobby flag they will receive information about the flag


## Models
```
User:
UserID            : String "USR-{Random String (5)}"
UserName          : String
DisplayName       : String
Pword             : String
Admin             : Bool
```

```
Lobby:
LobbyID           : String "LOBBY-{Random String (5)}"
LobbyName         : String
LobbyParticipants : User[]
LobbyType         : String   ("SHOOTER-FFA" | "SHOOTER-TDM" | "LOOTER")
```

```
Team:
TeamID:           : String "TEAM-{Random String (5)}"
LobbyID           : String Lobby.LobbyID
TeamName          : String
TeamPlayer        : User[]
```

```
Hits:
HitID:            : Number
Scanner           : String
Scanned           : String
Timestamp         : Number (Unix Epoch)
```

```
Flags:
FlagID            : String "FLAG-{Random String (5)}"
FlagName          : String
FlagDesc          : String
FlagInfo          : String
LobbyID           : String Lobby.LobbyID
```
## Admin Features
---
* Reset Player Display Name
* Reset Player Pword
* Create Player
* Create Admin Player
---
* Create Lobby
* Delete Lobby
* Empty Lobby
* Empty Lobbies
---
* Clear Hits in Lobby
* Clear all Hits
---
* Print Player QR Code
* Print All Player QR Code
* Print all Player in Lobby QR Code
* Print Flag QR Code
* Print All Flag QR Code
* Print All Lobby Flag QR Code


## Todo

* [ ] Model creation
* [ ] Model associations
* [ ] Model abstraction layer
* [ ] Authentication
  * [ ] Setup passport on backend
  * [ ] create mvp frontend
    * [ ] implement basic auth frontend
* [ ]
