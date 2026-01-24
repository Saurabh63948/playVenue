import Game from "../models/game.js"

export const createGame = async (req, res) => {
  try {
    const {
      sports,
      area,
      date,
      time,
      admin,
      totalPlayers,
      activityAccess = "public",
    } = req.body;

    const newGame=new Game ({
      sports,
      area,
      date,
      time,
      admin,
      totalPlayers,
       activityAccess,
       players:[admin]
    })

    const saveGame=await newGame.save();
    res.status(200).json({success:true,message:"game is created successfully",data:saveGame})
  } catch (error) {
    console.error("Error creating game", error);
    res.status(500).json({ message: "failed to create game" });
    

  }
};
