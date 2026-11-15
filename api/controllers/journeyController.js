import { journeyFormater } from "../lib/formaters.js";
import journeyService from "../services/journeyService.js";

export const getJourney = async (req, res) => {
  try {
    const journeys = await journeyService.getAll();

    const formatedJoutrneys = journeys.map((p) => journeyFormater(p));

    return res.json({
      journeys: formatedJoutrneys,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const addJourney = async (req, res) => {
  try {
    const { title, org, start_date, end_date, type, location, description, org_link } = req.body;

    if (!title || !start_date || !end_date || !type)
      return res.status(400).json({
        message: "Missing some required fields",
      });

    const journey = await journeyService.create({ title, org, start_date, end_date, type, location, description, org_link })

    return res.json({ journey: journeyFormater(journey) });

  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteJourney = async (req, res) => {
  try {
    const { id } = req.params;
    const journey = await journeyService.getById(id)


    if (!journey) {
      return res.status(404).json({ message: "Journey not found" });
    }

    await journeyService.deleteById(id);

    return res.json({ message: "Journey deleted successfully" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const editJourney = async (req, res) => {
  try {
    const { id } = req.params;

    const { title, org, start_date, end_date, type, location, description, org_link } = req.body;

    if (!title || !start_date || !end_date || !type)
      return res.status(400).json({
        message: "Missing some required fields",
      });

    const journey = await journeyService.updateById(id , { title, org, start_date, end_date, type, location, description, org_link })


    return res.json({ journey: journeyFormater(journey) });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};
