import { journeyFormater } from "../lib/formaters.js";
import Journey from "../models/Journey.js";

export const getJourney = async (req, res) => {
  try {
    const journeys = await Journey.find().sort({ createdAt: -1 });

    const formatedJoutrneys = journeys.map(p => journeyFormater(p))
    return res.json({
      journeys : formatedJoutrneys,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const addJourney = async (req, res) => {
  try {
    const { title, org, start_date, end_date, type, location, description , org_link} =
      req.body;

    if (!title || !start_date || !end_date || !type)
      return res.status(400).json({
        error: "Missing some required fields",
      });

    const journey = await Journey.create({title , start_date , end_date , type ,  ...(location && { location }) ,  ...(description && { description }) , ...(org && { org }) , ...(org_link && { org_link })})
    console.log(journey) 

    return res.json({ journey : journeyFormater(journey)})
    
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Internal server error" });
  }
};



export const deleteJourney = async (req , res)=>{
    try {
        const { id } = req.params 

        await Journey.findByIdAndDelete(id);
        return res.json({message : "Journey deleted successfully"})
    }
    catch (err) {
        console.log(err)
        return res.status(500).json({ error: 'Internal server error' });
    }
}


export const editJourney = async (req , res)=>{
    try {
        const { id } = req.params 

        const { title, org, start_date, end_date, type, location, description , org_link } = req.body

        const journey = await Journey.findByIdAndUpdate(id , {
            $set : {
                ...(title && { title }) ,
                ...(description && { description }), 
                ...(org && { org }),
                ...(start_date && { start_date }),
                ...(end_date && { end_date }),
                ...(type && { type }),
                ...(location && { location }),
                ...(org_link && { org_link }),
            }
        } , { new : true})


        console.log(journeyFormater(journey))

        
        return res.json({journey : journeyFormater(journey) })


    }
    catch (err) {
        console.log(err)
        return res.status(500).json({ error: 'Internal server error' });
    }
}